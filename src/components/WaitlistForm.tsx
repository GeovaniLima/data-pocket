"use client";

import { useState, useId } from "react";

type Plan = "inicial" | "plus";

type OrderData = { nome: string; negocio: string; telefone: string };
const INITIAL_ORDER: OrderData = { nome: "", negocio: "", telefone: "" };

type PlanConfig = {
  id: Plan; name: string; price: string; period: string;
  badge: string | null; features: string[]; cta: string; highlight: boolean;
};

const plans: PlanConfig[] = [
  {
    id: "inicial",
    name: "Plano Inicial",
    price: "R$ 79,90",
    period: "/mês",
    badge: null,
    features: ["100 mensagens por mês", "Dados da sua planilha do Excel"],
    cta: "Comprar",
    highlight: true,
  },
  {
    id: "plus",
    name: "Plano Plus",
    price: "A consultar",
    period: "",
    badge: "Em breve",
    features: ["Mensagens ilimitadas", "Integre com seu sistema"],
    cta: "Comprar",
    highlight: false,
  },
];

const perks = [
  "Acesso antecipado",
  "Conexão com sua planilha",
  "Suporte direto com o time de produto",
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length >= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length >= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length >= 1) return `(${d}`;
  return d;
}

export default function WaitlistForm() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>(INITIAL_ORDER);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [donePlan, setDonePlan] = useState<Plan | null>(null);
  const uid = useId();

  function openModal(plan: Plan) {
    setSelectedPlan(plan);
    setOrderData(INITIAL_ORDER);
    setErrors({});
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedPlan(null);
  }

  function setField(field: keyof OrderData, value: string) {
    setOrderData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: false }));
  }

  function validate() {
    const newErrors: Partial<Record<keyof OrderData, boolean>> = {};
    (["nome", "negocio", "telefone"] as (keyof OrderData)[]).forEach((k) => {
      if (!orderData[k].trim()) newErrors[k] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderData, plano: selectedPlan }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erro ao salvar.");
      }
      setDonePlan(selectedPlan);
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="grain" style={{ background: "#0a0a0a" }} id="waitlist">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── Coluna esquerda ─────────────────────────── */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="animate-pulse-dot w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
                />
                <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>
                  Vagas limitadas — primeiros clientes
                </span>
              </div>

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

              <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
                As primeiras empresas terão acesso antecipado e condições especiais de fundadores.
              </p>

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
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="pt-6 border-t flex items-center gap-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex -space-x-1.5">
                  {["#4ade80", "#22c55e", "#16a34a"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: c, borderColor: "#0a0a0a" }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Mais de 50 empreendedores já estão na lista
                </p>
              </div>
            </div>

            {/* ── Coluna direita — cards de plano ──────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.map((plan) => {
                const isDone = donePlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      background: "#141414",
                      border: plan.highlight
                        ? "1px solid rgba(34,197,94,0.35)"
                        : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: plan.highlight ? "0 0 24px rgba(34,197,94,0.08)" : "none",
                    }}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold tracking-wide uppercase"
                        style={{ color: plan.highlight ? "#22c55e" : "rgba(255,255,255,0.4)" }}
                      >
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.4)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <span
                        className="font-display font-extrabold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: plan.period ? "1.75rem" : "1.25rem",
                          color: "#ffffff",
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <svg
                            className="flex-shrink-0 mt-0.5"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 7.5l3.5 3.5 6.5-7"
                              stroke={plan.highlight ? "#22c55e" : "rgba(255,255,255,0.3)"}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {isDone ? (
                      <div
                        className="w-full py-3 rounded-xl text-sm font-semibold text-center"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                      >
                        Recebido! Entraremos em contato.
                      </div>
                    ) : (
                      <button
                        onClick={() => openModal(plan.id)}
                        className="w-full py-3 rounded-xl text-sm font-extrabold tracking-tight transition-all duration-200 hover:-translate-y-0.5"
                        style={
                          plan.highlight
                            ? {
                              background: "#22c55e",
                              color: "#0a0a0a",
                              boxShadow: "0 8px 24px rgba(34,197,94,0.25)",
                            }
                            : {
                              background: "rgba(255,255,255,0.06)",
                              color: "rgba(255,255,255,0.7)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }
                        }
                      >
                        {plan.cta}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── Modal de compra ─────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-7 flex flex-col gap-5"
            style={{ background: "#141414", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "#22c55e" }}>
                  {selectedPlan === "inicial" ? "Plano Inicial" : "Plano Plus"}
                </p>
                <h3 className="font-display font-extrabold text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Seus dados para contato
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                aria-label="Fechar"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <ModalField label="Nome completo" id={`${uid}-nome`} error={errors.nome}>
                <input
                  id={`${uid}-nome`}
                  type="text"
                  placeholder="Seu nome"
                  value={orderData.nome}
                  onChange={(e) => setField("nome", e.target.value)}
                  className={inputClass(errors.nome)}
                />
              </ModalField>

              <ModalField label="Nome do negócio" id={`${uid}-negocio`} error={errors.negocio}>
                <input
                  id={`${uid}-negocio`}
                  type="text"
                  placeholder="Nome da sua empresa"
                  value={orderData.negocio}
                  onChange={(e) => setField("negocio", e.target.value)}
                  className={inputClass(errors.negocio)}
                />
              </ModalField>

              <ModalField label="Telefone / WhatsApp" id={`${uid}-tel`} error={errors.telefone}>
                <input
                  id={`${uid}-tel`}
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={orderData.telefone}
                  onChange={(e) => setField("telefone", maskPhone(e.target.value))}
                  inputMode="numeric"
                  className={inputClass(errors.telefone)}
                />
              </ModalField>

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
                {loading ? "Enviando..." : "Confirmar interesse"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function ModalField({ label, id, error, children }: { label: string; id: string; error?: boolean; children: React.ReactNode }) {
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

function inputClass(error?: boolean) {
  return [
    "rounded-xl px-4 py-3 text-sm outline-none w-full transition-all duration-150 focus:ring-2",
    error
      ? "border border-red-500/60 bg-red-500/5 text-white placeholder:text-white/20"
      : "border border-white/8 bg-white/5 text-white placeholder:text-white/20 focus:border-[#22c55e] focus:ring-[#22c55e]/15",
  ].join(" ");
}
