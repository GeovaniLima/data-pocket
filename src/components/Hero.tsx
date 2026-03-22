import Link from "next/link";

const proofPoints = [
  { num: "82%", label: "já tiveram prejuízo por falta de dados" },
  { num: "100%", label: "mudariam decisões com visão unificada" },
  { num: "91%", label: "pagariam por uma visão clara do negócio" },
];

/* Mensagens estáticas para o phone mockup */
const previewMessages = [
  { from: "user", text: "Qual o produto que mais lucra hoje?" },
  { from: "bot", text: "Top 3 por margem esta semana 📊\n\n🥇 Omeprazol 20mg — 42%\n🥈 Dipirona 500mg — 38%\n🥉 Amoxicilina — 31%\n\n💡 O Omeprazol tem a maior margem. Quer ver o potencial de impulsioná-lo?" },
  { from: "user", text: "Como foi meu faturamento essa semana?" },
  { from: "bot", text: "Faturamento esta semana: R$ 12.430\nVs. semana passada: +8,3% 📈\nMelhor dia: quinta-feira (R$ 2.890)" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Fundo com blur radial verde sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(34,197,94,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Texto ─────────────────────────────────────── */}
          <div>
            {/* Label mono */}
            <div
              className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase mb-7 animate-fade-in-up"
              style={{ color: "#999999", animationDelay: "0s" }}
            >
              Acesso antecipado · 2026
            </div>

            {/* H1 */}
            <h1
              className="font-display font-extrabold leading-[1.06] tracking-[-0.035em] text-[#0a0a0a] mb-6 animate-fade-in-up"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--display-xl)",
                animationDelay: "0.05s",
              }}
            >
              O dado que você já tem,{" "}
              <span
                className="font-light italic"
                style={{ color: "#22c55e" }}
              >
                finalmente
              </span>{" "}
              na sua mão.
            </h1>

            {/* Subtítulo */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-md animate-fade-in-up"
              style={{ color: "#555555", animationDelay: "0.1s" }}
            >
              A última milha do dado: da sua planilha direto para a decisão —
              em segundos, no WhatsApp.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.15s" }}
            >
              <Link
                href="#waitlist"
                className="inline-flex items-center justify-center px-7 py-4 rounded-lg bg-[#22c55e] text-white font-semibold text-sm tracking-tight transition-all duration-200 hover:bg-[#16a34a] hover:-translate-y-0.5"
                style={{ boxShadow: "0 8px 24px rgba(34,197,94,0.3)" }}
              >
                Quero entrar na lista de espera
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-1.5 px-7 py-4 text-sm font-semibold tracking-tight transition-colors duration-200 hover:text-[#0a0a0a]"
                style={{ color: "#555555" }}
              >
                Ver como funciona
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Proof stats inline */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:divide-x divide-[#e8e4de]">
                {proofPoints.map((p, i) => (
                  <div
                    key={p.num}
                    className={`flex flex-col gap-1 ${i > 0 ? "sm:pl-6" : ""}`}
                  >
                    <span
                      className="text-2xl font-black tracking-tight leading-none font-display"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#0a0a0a",
                      }}
                    >
                      {p.num}
                    </span>
                    <span
                      className="text-xs leading-snug max-w-[140px]"
                      style={{ color: "#888888" }}
                    >
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="text-[0.6rem] tracking-wide mt-4"
                style={{ color: "#bbbbbb" }}
              >
                Pesquisa de campo Data Pocket — março/2026
              </p>
            </div>
          </div>

          {/* ── Phone Mockup ──────────────────────────────── */}
          <div
            className="relative flex items-center justify-center animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Halo verde atrás do phone */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(34,197,94,0.1) 0%, transparent 70%)",
              }}
            />

            {/* Phone frame */}
            <div
              className="phone-frame relative w-[260px] sm:w-[300px]"
              style={{ transform: "rotate(-2deg)" }}
            >
              {/* Status bar */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ background: "#075E54" }}
              >
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#22c55e" }}
                  >
                    <span className="text-white font-extrabold" style={{ fontSize: "7px", letterSpacing: "-0.02em" }}>DP</span>
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-semibold leading-none">Data Pocket</p>
                    <p className="text-[8px] leading-none mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>online</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.7)" /><circle cx="19" cy="12" r="1" fill="rgba(255,255,255,0.7)" /><circle cx="5" cy="12" r="1" fill="rgba(255,255,255,0.7)" /></svg>
                </div>
              </div>

              {/* Chat area */}
              <div
                className="px-3 py-4 flex flex-col gap-2.5"
                style={{
                  background: "#ECE5DD",
                  minHeight: "340px",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bdb4' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              >
                {previewMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[85%] rounded-xl px-3 py-2 text-[9.5px] leading-relaxed whitespace-pre-line"
                      style={{
                        background: msg.from === "user" ? "#DCF8C6" : "#ffffff",
                        color: "#111111",
                        borderRadius:
                          msg.from === "user"
                            ? "12px 12px 4px 12px"
                            : "12px 12px 12px 4px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-1 px-3 py-2 rounded-xl"
                    style={{
                      background: "#ffffff",
                      borderRadius: "12px 12px 12px 4px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#aaa] inline-block" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#aaa] inline-block" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#aaa] inline-block" />
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div
                className="flex items-center gap-2 px-3 py-3"
                style={{ background: "#F0F0F0" }}
              >
                <div
                  className="flex-1 rounded-full px-3 py-1.5 text-[9px]"
                  style={{ background: "#ffffff", color: "#999" }}
                >
                  Pergunte algo sobre seu negócio...
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "#22c55e" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
