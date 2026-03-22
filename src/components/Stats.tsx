const stats = [
  {
    num: "47M",
    label: "de brasileiros à frente de algum negócio",
    source: "GEM 2024 / Sebrae",
    hero: true,
  },
  {
    num: "62%",
    label: "das empresas fecham em até 5 anos",
    source: "IBGE — Demo. das Empresas, 2024",
    hero: false,
  },
  {
    num: "1,6/8",
    label: "nota em 'uso de dados' — pior entre 8 dimensões",
    source: "Sebrae/PR + ABDI, 2024",
    hero: false,
  },
  {
    num: "90%",
    label: "dos donos de PMEs têm dificuldade em gestão financeira",
    source: "Locomotiva / Itaú, 2024",
    hero: false,
  },
];

export default function Stats() {
  return (
    <section style={{ background: "#fafaf9" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Cabeçalho */}
        <h2
          className="font-display font-extrabold tracking-tight leading-tight mb-12 max-w-lg"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--display-md)",
            color: "#0a0a0a",
          }}
        >
          O tamanho do problema
          <br />
          que estamos resolvendo
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card hero — 47M (span 2 cols no desktop) */}
          <div
            className="sm:col-span-2 rounded-2xl p-8 flex flex-col justify-between"
            style={{
              background: "#0a0a0a",
              minHeight: "220px",
            }}
          >
            <div>
              <p
                className="font-display font-black leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                  color: "#ffffff",
                }}
              >
                {stats[0].num}
              </p>
              <p
                className="text-sm leading-snug mt-3 max-w-[220px]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {stats[0].label}
              </p>
            </div>
            <p
              className="text-[0.6rem] font-medium tracking-[0.08em] uppercase mt-6"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {stats[0].source}
            </p>
          </div>

          {/* Cards regulares */}
          {stats.slice(1).map((s) => (
            <div
              key={s.num}
              className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#ffffff",
                border: "1px solid #e8e4de",
                minHeight: "180px",
              }}
            >
              <div>
                <p
                  className="font-display font-black leading-none tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    color: "#0a0a0a",
                  }}
                >
                  {s.num}
                </p>
                <p
                  className="text-sm leading-snug mt-3"
                  style={{ color: "#555555" }}
                >
                  {s.label}
                </p>
              </div>
              <p
                className="text-[0.6rem] font-medium tracking-[0.08em] uppercase mt-4"
                style={{ color: "#aaaaaa" }}
              >
                {s.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
