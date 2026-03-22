const rows = [
  ["Dashboard cheio de gráficos que ninguém entende", "Resposta em linguagem de negócio"],
  ["Precisa de treinamento para usar", "Zero treinamento — é como o WhatsApp"],
  ["Você procura o dado e não acha", "Você pergunta, ele responde em segundos"],
  ["Substitui sua planilha por outro sistema", "Usa a planilha que você já tem, sem migração"],
  ["Resposta em horas ou dias", "Disponível 24h, onde você estiver"],
  ["Linguagem técnica de BI", "Linguagem de dono de negócio"],
];

export default function Differentials() {
  return (
    <section className="grain" style={{ background: "#0f0f0f" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-14">
          <span className="section-label" style={{ color: "#22c55e" }}>
            Por que Data Pocket
          </span>
          <h2
            className="font-display font-extrabold tracking-tight mt-4 leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--display-lg)",
              color: "#ffffff",
            }}
          >
            Não é mais um dashboard.
            <br />
            É a decisão que você precisava.
          </h2>
        </div>

        {/* Cabeçalho das colunas */}
        <div
          className="grid grid-cols-[1fr_32px_1fr] gap-4 mb-2 pb-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <span
            className="text-xs font-semibold tracking-[0.08em] uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Outros sistemas
          </span>
          <span />
          <span
            className="text-xs font-semibold tracking-[0.08em] uppercase"
            style={{ color: "#22c55e" }}
          >
            Data Pocket
          </span>
        </div>

        {/* Linhas de comparação */}
        <div className="flex flex-col">
          {rows.map(([bad, good], i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_32px_1fr] gap-4 py-5 border-b items-center"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Coluna "outros" */}
              <p
                className="text-sm leading-snug line-through"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                {bad}
              </p>

              {/* Seta central */}
              <div className="flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Coluna "Data Pocket" */}
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {good}
              </p>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div className="mt-12 flex items-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#22c55e",
              color: "#0a0a0a",
              boxShadow: "0 8px 24px rgba(34,197,94,0.25)",
            }}
          >
            Quero experimentar
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Acesso antecipado gratuito
          </span>
        </div>

      </div>
    </section>
  );
}
