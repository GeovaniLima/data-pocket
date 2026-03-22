const problems = [
  {
    num: "01",
    title: "O dado existe, mas não chega",
    body: "Margem, ponto de equilíbrio, giro de estoque — tudo está na sua planilha. Mas em qual aba? Com qual fórmula? Não dá tempo de procurar.",
    stat: null,
  },
  {
    num: "02",
    title: "Planilha e caderno não são solução",
    body: (
      <>
        <strong style={{ color: "rgba(255,255,255,0.9)" }}>73%</strong> dos empreendedores usam controles paralelos para compensar o que o sistema não mostra. É sinal de que a ferramenta falhou — não você.
      </>
    ),
    stat: null,
  },
  {
    num: "03",
    title: "Você não tem tempo a perder",
    body: (
      <>
        Com <strong style={{ color: "rgba(255,255,255,0.9)" }}>50+ horas</strong> por semana e 98% das decisões nas suas mãos, você precisa da resposta agora — não depois de um relatório de 3 horas.
      </>
    ),
    stat: null,
  },
];

export default function Problem() {
  return (
    <section className="grain" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">

          {/* ── Coluna esquerda — editorial quote ─────────── */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            {/* Label */}
            <div>
              <span
                className="section-label"
                style={{ color: "#22c55e" }}
              >
                O problema real
              </span>

              {/* Aspas decorativas */}
              <div
                aria-hidden="true"
                className="font-display select-none leading-none mt-4 mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(6rem, 12vw, 9rem)",
                  color: "rgba(255,255,255,0.05)",
                  lineHeight: 1,
                }}
              >
                "
              </div>

              {/* Blockquote */}
              <blockquote>
                <p
                  className="text-base sm:text-lg italic leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Há empresários que comemoram aumento de vendas sem perceber que a
                  margem está caindo. Trabalham mais, faturam mais, mas lucram menos.
                </p>
                <cite
                  className="text-xs not-italic"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  — CartaCapital / Sebrae, 2025
                </cite>
              </blockquote>
            </div>

            {/* Stat callout */}
            <div
              className="mt-10 pt-8 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <p
                className="text-[2.5rem] font-black leading-none tracking-tight font-display mb-1"
                style={{ fontFamily: "var(--font-display)", color: "#22c55e" }}
              >
                73%
              </p>
              <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>
                dos empreendedores tomam<br />decisões sem dados confiáveis
              </p>
            </div>
          </div>

          {/* ── Coluna direita — lista de problemas ───────── */}
          <div
            className="lg:col-span-3 flex flex-col divide-y"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div style={{ borderColor: "rgba(255,255,255,0.08)" }} />
            {problems.map((p) => (
              <div
                key={p.num}
                className="py-8 flex gap-6"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Número */}
                <span
                  className="text-xs font-semibold tracking-[0.1em] flex-shrink-0 mt-0.5 tabular-nums"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  {p.num}
                </span>

                {/* Conteúdo */}
                <div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
