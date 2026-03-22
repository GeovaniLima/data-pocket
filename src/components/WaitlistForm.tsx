"use client";

import { useState, useId } from "react";

type FormData = {
  nome: string;
  negocio: string;
  porte: string;
  sistema: string;
  qual_sistema: string;
  dificuldade: string;
  whatsapp: string;
};

const INITIAL: FormData = {
  nome: "",
  negocio: "",
  porte: "",
  sistema: "",
  qual_sistema: "",
  dificuldade: "",
  whatsapp: "",
};

const perks = [
  "Acesso antecipado",
  "Preço de fundador",
  "Integração prioritária com seu sistema",
  "Suporte direto com o time de produto",
];

function maskPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 11);
  if (digits.length >= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length >= 3)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length >= 1) return `(${digits}`;
  return digits;
}

export default function WaitlistForm() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const uid = useId();

  function set(field: keyof FormData, value: string) {
    setData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: false }));
  }

  function validate() {
    const required: (keyof FormData)[] = [
      "nome", "negocio", "porte", "sistema", "dificuldade", "whatsapp",
    ];
    if (data.sistema === "sim-qual") required.push("qual_sistema");

    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    required.forEach((k) => {
      if (!data[k].trim()) newErrors[k] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Erro ao salvar.");
      }
      setDone(true);
      setCountdown(10);
      let secs = 10;
      const timer = setInterval(() => {
        secs -= 1;
        setCountdown(secs);
        if (secs <= 0) {
          clearInterval(timer);
          setDone(false);
          setData(INITIAL);
          setCountdown(10);
        }
      }, 1000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="py-20 bg-[#12121A] border-t border-white/8"
      id="waitlist"
    >
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <Tag>Lista de espera</Tag>
            <div className="mt-3 inline-flex items-center gap-2 bg-[#10E898]/10 border border-[#10E898]/25 rounded-full px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10E898] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10E898]"></span>
              </span>
              <span className="text-xs font-semibold text-[#10E898]">Apenas 2 vagas restantes de 100</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mt-4 mb-4">
              Seja o primeiro a usar o Data Pocket
            </h2>
            <p className="text-[#8888AA] text-base leading-relaxed mb-8">
              Estamos em fase de lançamento. As primeiras empresas da lista
              terão acesso antecipado e condições especiais de fundadores.
            </p>
            <div className="flex flex-col gap-3">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-sm text-[#F0F0F8] font-medium">
                  <span className="text-[#10E898] font-bold">✓</span>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form or Success */}
          <div>
            {done ? (
              <div className="bg-[#0A0A0F] border border-[#10E898]/25 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-white text-xl font-extrabold mb-3">
                  Você está na lista!
                </h3>
                <p className="text-[#8888AA] text-sm leading-relaxed">
                  Avisaremos assim que as vagas da primeira turma abrirem.
                  Fique de olho no WhatsApp.
                </p>
                <p className="text-xs text-[#555577] mt-6">
                  Voltando ao formulário em {countdown}s...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#0A0A0F] border border-white/8 rounded-2xl p-7 flex flex-col gap-5"
              >
                <Field
                  label="Nome completo *"
                  id={`${uid}-nome`}
                  error={errors.nome}
                >
                  <input
                    id={`${uid}-nome`}
                    type="text"
                    placeholder="Seu nome"
                    value={data.nome}
                    onChange={(e) => set("nome", e.target.value)}
                    className={inputClass(errors.nome)}
                  />
                </Field>

                <Field
                  label="Nome do negócio *"
                  id={`${uid}-negocio`}
                  error={errors.negocio}
                >
                  <input
                    id={`${uid}-negocio`}
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={data.negocio}
                    onChange={(e) => set("negocio", e.target.value)}
                    className={inputClass(errors.negocio)}
                  />
                </Field>

                <Field
                  label="Faturamento mensal *"
                  id={`${uid}-porte`}
                  error={errors.porte}
                >
                  <select
                    id={`${uid}-porte`}
                    value={data.porte}
                    onChange={(e) => set("porte", e.target.value)}
                    className={selectClass(errors.porte)}
                  >
                    <option value="" disabled>Selecione o porte</option>
                    <option value="ate-20k">Até R$ 20 mil / mês</option>
                    <option value="20-80k">R$ 20 mil a R$ 80 mil / mês</option>
                    <option value="80-300k">R$ 80 mil a R$ 300 mil / mês</option>
                    <option value="300k-1m">R$ 300 mil a R$ 1 milhão / mês</option>
                    <option value="acima-1m">Acima de R$ 1 milhão / mês</option>
                  </select>
                </Field>

                <Field
                  label="Usa algum sistema de gestão? *"
                  id={`${uid}-sistema`}
                  error={errors.sistema}
                >
                  <select
                    id={`${uid}-sistema`}
                    value={data.sistema}
                    onChange={(e) => set("sistema", e.target.value)}
                    className={selectClass(errors.sistema)}
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="nao">Não uso sistema</option>
                    <option value="planilha">Só uso planilhas</option>
                    <option value="sim-qual">Sim — vou informar qual</option>
                  </select>
                </Field>

                {data.sistema === "sim-qual" && (
                  <Field
                    label="Qual sistema você usa? *"
                    id={`${uid}-qual`}
                    error={errors.qual_sistema}
                  >
                    <input
                      id={`${uid}-qual`}
                      type="text"
                      placeholder="Ex: Bling, Tiny, Omie, SAP, Totvs..."
                      value={data.qual_sistema}
                      onChange={(e) => set("qual_sistema", e.target.value)}
                      className={inputClass(errors.qual_sistema)}
                    />
                  </Field>
                )}

                <Field
                  label="Maior dificuldade com dados? *"
                  id={`${uid}-dif`}
                  error={errors.dificuldade}
                >
                  <select
                    id={`${uid}-dif`}
                    value={data.dificuldade}
                    onChange={(e) => set("dificuldade", e.target.value)}
                    className={selectClass(errors.dificuldade)}
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="interpretar">Interpretar os dados que tenho</option>
                    <option value="acessar">Acessar os dados quando preciso</option>
                    <option value="unificar">Unificar dados de fontes diferentes</option>
                    <option value="decidir">Transformar dados em decisão</option>
                    <option value="nao-tenho">Não tenho dados organizados</option>
                  </select>
                </Field>

                <Field
                  label="WhatsApp *"
                  id={`${uid}-wpp`}
                  error={errors.whatsapp}
                >
                  <input
                    id={`${uid}-wpp`}
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={data.whatsapp}
                    onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
                    inputMode="numeric"
                    className={inputClass(errors.whatsapp)}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 py-4 rounded-full bg-[#6C3DE8] text-white font-bold text-base shadow-[0_8px_40px_rgba(108,61,232,0.35)] hover:bg-[#4F2AB8] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Enviando..." : "Quero meu acesso antecipado"}
                </button>

                <p className="text-xs text-[#333355] text-center -mt-1">
                  Sem spam. Sem compromisso. Você pode sair quando quiser.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-[#6C3DE8]/15 border border-[#6C3DE8]/30 text-[#8B5CF6] text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full">
      {children}
    </span>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-[#8888AA] tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-400">Campo obrigatório</span>
      )}
    </div>
  );
}

function inputClass(error?: boolean) {
  return [
    "bg-[#1A1A28] border rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#333355] outline-none w-full transition-all duration-150",
    "focus:ring-2 focus:ring-[#6C3DE8]/40 focus:border-[#8B5CF6]",
    error ? "border-red-500" : "border-white/8",
  ].join(" ");
}

function selectClass(error?: boolean) {
  return [
    "bg-[#1A1A28] border rounded-xl px-4 py-3 text-sm text-white outline-none w-full appearance-none transition-all duration-150",
    "focus:ring-2 focus:ring-[#6C3DE8]/40 focus:border-[#8B5CF6]",
    error ? "border-red-500" : "border-white/8",
  ].join(" ");
}
