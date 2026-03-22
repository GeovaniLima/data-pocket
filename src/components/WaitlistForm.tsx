"use client";

import { useState, useId } from "react";

type FormData = {
  nome: string; negocio: string; porte: string;
  sistema: string; qual_sistema: string; dificuldade: string; whatsapp: string;
};

const INITIAL: FormData = { nome: "", negocio: "", porte: "", sistema: "", qual_sistema: "", dificuldade: "", whatsapp: "" };

const perks = [
  "Acesso antecipado",
  "Preço de fundador",
  "Integração prioritária com seu sistema",
  "Suporte direto com o time de produto",
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length >= 7) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  if (d.length >= 3) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length >= 1) return `(${d}`;
  return d;
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
    const required: (keyof FormData)[] = ["nome","negocio","porte","sistema","dificuldade","whatsapp"];
    if (data.sistema === "sim-qual") required.push("qual_sistema");
    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    required.forEach((k) => { if (!data[k].trim()) newErrors[k] = true; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || "Erro ao salvar."); }
      setDone(true); setCountdown(10);
      let secs = 10;
      const timer = setInterval(() => {
        secs -= 1; setCountdown(secs);
        if (secs <= 0) { clearInterval(timer); setDone(false); setData(INITIAL); setCountdown(10); }
      }, 1000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.");
    } finally { setLoading(false); }
  }

  return (
    <section className="grain" style={{ background: "#0a0a0a" }} id="waitlist">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Coluna esquerda ─────────────────────────── */}
          <div>
            {/* Indicador de vagas */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="animate-pulse-dot w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#22c55e" }}
              >
                Apenas 2 vagas restantes de 100
              </span>
            </div>

            {/* Título */}
            <h2
              className="font-display font-extrabold tracking-tight leading-tight mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--display-lg)",
                color: "#ffffff",
              }}
            >
              Seja o primeiro a usar o Data Pocket
            </h2>

            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              As primeiras empresas da lista terão acesso antecipado e
              condições especiais de fundadores.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-4 mb-10">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1.5 5.5l2.5 2.5 4.5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div
              className="pt-6 border-t flex items-center gap-3"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex -space-x-1.5">
                {["#4ade80","#22c55e","#16a34a"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ background: c, borderColor: "#0a0a0a" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Mais de 50 empreendedores já estão na lista
              </p>
            </div>
          </div>

          {/* ── Coluna direita — formulário ──────────────── */}
          <div>
            {done ? (
              /* Sucesso */
              <div
                className="rounded-2xl p-10 text-center"
                style={{
                  background: "#141414",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                {/* Checkmark SVG */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.3)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M5 14l7 7 11-11" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  className="font-display text-xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "#ffffff" }}
                >
                  Você está na lista!
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Avisaremos assim que as vagas da primeira turma abrirem.
                  Fique de olho no WhatsApp.
                </p>
                <p
                  className="text-xs mt-6"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  Voltando ao formulário em {countdown}s...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <DarkField label="Nome completo" id={`${uid}-nome`} error={errors.nome}>
                  <input id={`${uid}-nome`} type="text" placeholder="Seu nome" value={data.nome}
                    onChange={(e) => set("nome", e.target.value)} className={darkInputClass(errors.nome)} />
                </DarkField>

                <DarkField label="Nome do negócio" id={`${uid}-negocio`} error={errors.negocio}>
                  <input id={`${uid}-negocio`} type="text" placeholder="Nome da sua empresa" value={data.negocio}
                    onChange={(e) => set("negocio", e.target.value)} className={darkInputClass(errors.negocio)} />
                </DarkField>

                <DarkField label="Faturamento mensal" id={`${uid}-porte`} error={errors.porte}>
                  <select id={`${uid}-porte`} value={data.porte}
                    onChange={(e) => set("porte", e.target.value)} className={darkSelectClass(errors.porte)}>
                    <option value="" disabled>Selecione o porte</option>
                    <option value="ate-20k">Até R$ 20 mil / mês</option>
                    <option value="20-80k">R$ 20 mil a R$ 80 mil / mês</option>
                    <option value="80-300k">R$ 80 mil a R$ 300 mil / mês</option>
                    <option value="300k-1m">R$ 300 mil a R$ 1 milhão / mês</option>
                    <option value="acima-1m">Acima de R$ 1 milhão / mês</option>
                  </select>
                </DarkField>

                <DarkField label="Usa algum sistema de gestão?" id={`${uid}-sistema`} error={errors.sistema}>
                  <select id={`${uid}-sistema`} value={data.sistema}
                    onChange={(e) => set("sistema", e.target.value)} className={darkSelectClass(errors.sistema)}>
                    <option value="" disabled>Selecione</option>
                    <option value="nao">Não uso sistema</option>
                    <option value="planilha">Só uso planilhas</option>
                    <option value="sim-qual">Sim — vou informar qual</option>
                  </select>
                </DarkField>

                {data.sistema === "sim-qual" && (
                  <DarkField label="Qual sistema você usa?" id={`${uid}-qual`} error={errors.qual_sistema}>
                    <input id={`${uid}-qual`} type="text" placeholder="Ex: Bling, Tiny, Omie, SAP, Totvs..."
                      value={data.qual_sistema} onChange={(e) => set("qual_sistema", e.target.value)}
                      className={darkInputClass(errors.qual_sistema)} />
                  </DarkField>
                )}

                <DarkField label="Maior dificuldade com dados?" id={`${uid}-dif`} error={errors.dificuldade}>
                  <select id={`${uid}-dif`} value={data.dificuldade}
                    onChange={(e) => set("dificuldade", e.target.value)} className={darkSelectClass(errors.dificuldade)}>
                    <option value="" disabled>Selecione</option>
                    <option value="interpretar">Interpretar os dados que tenho</option>
                    <option value="acessar">Acessar os dados quando preciso</option>
                    <option value="unificar">Unificar dados de fontes diferentes</option>
                    <option value="decidir">Transformar dados em decisão</option>
                    <option value="nao-tenho">Não tenho dados organizados</option>
                  </select>
                </DarkField>

                <DarkField label="WhatsApp" id={`${uid}-wpp`} error={errors.whatsapp}>
                  <input id={`${uid}-wpp`} type="tel" placeholder="(00) 00000-0000" value={data.whatsapp}
                    onChange={(e) => set("whatsapp", maskPhone(e.target.value))}
                    inputMode="numeric" className={darkInputClass(errors.whatsapp)} />
                </DarkField>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 py-4 rounded-xl font-extrabold text-sm tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  style={{
                    background: "#22c55e",
                    color: "#0a0a0a",
                    boxShadow: "0 8px 24px rgba(34,197,94,0.3)",
                  }}
                >
                  {loading ? "Enviando..." : "Quero meu acesso antecipado"}
                </button>

                <p
                  className="text-xs text-center -mt-1"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
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

function DarkField({ label, id, error, children }: { label: string; id: string; error?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs" style={{ color: "#f87171" }}>
          Campo obrigatório
        </span>
      )}
    </div>
  );
}

function darkInputClass(error?: boolean) {
  return [
    "rounded-xl px-4 py-3 text-sm outline-none w-full transition-all duration-150",
    "focus:ring-2",
    error
      ? "border border-red-500/60 bg-red-500/5 text-white placeholder:text-white/20"
      : "border border-white/8 bg-white/5 text-white placeholder:text-white/20 focus:border-[#22c55e] focus:ring-[#22c55e]/15",
  ].join(" ");
}

function darkSelectClass(error?: boolean) {
  return [
    "rounded-xl px-4 py-3 text-sm outline-none w-full appearance-none transition-all duration-150",
    "focus:ring-2",
    error
      ? "border border-red-500/60 bg-red-500/5 text-white"
      : "border border-white/8 bg-white/5 text-white focus:border-[#22c55e] focus:ring-[#22c55e]/15",
  ].join(" ");
}
