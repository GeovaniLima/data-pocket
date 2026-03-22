/* Artefatos contextuais para cada step */
const stepArtifacts = [
  /* Step 01 — conecta ao sistema */
  () => (
    <div
      className="rounded-xl p-4 border"
      style={{ background: "#fafaf9", borderColor: "#e8e4de" }}
    >
      <p
        className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase mb-3"
        style={{ color: "#aaaaaa" }}
      >
        Integrações disponíveis
      </p>
      <div className="grid grid-cols-2 gap-2">
        {["Bling", "Omie", "Totvs", "SAP B1"].map((erp) => (
          <div
            key={erp}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center"
            style={{ background: "#ffffff", border: "1px solid #e8e4de", color: "#555" }}
          >
            {erp}
          </div>
        ))}
      </div>
      <p className="text-[0.6rem] text-center mt-2" style={{ color: "#bbbbbb" }}>
        + outros em breve
      </p>
    </div>
  ),

  /* Step 02 — pergunta no WhatsApp */
  () => (
    <div
      className="rounded-xl p-3 border"
      style={{ background: "#fafaf9", borderColor: "#e8e4de" }}
    >
      <div className="flex flex-col gap-2">
        {[
          { from: "user", text: "Qual produto me dá mais lucro?" },
          { from: "bot",  text: "Omeprazol 20mg — margem 42% 📊" },
        ].map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[80%] rounded-xl px-3 py-1.5 text-[10px] leading-snug"
              style={{
                background: m.from === "user" ? "#DCF8C6" : "#ffffff",
                border: m.from === "bot" ? "1px solid #e8e4de" : "none",
                color: "#111",
                borderRadius: m.from === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  /* Step 03 — decisão */
  () => (
    <div
      className="rounded-xl px-5 py-4 flex items-center gap-3 border"
      style={{ background: "#fafaf9", borderColor: "#e8e4de" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(34,197,94,0.1)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7.5l3 3 6-6" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-semibold" style={{ color: "#0a0a0a" }}>Decisão feita</p>
        <p className="text-[10px]" style={{ color: "#888888" }}>Em menos de 30 segundos</p>
      </div>
    </div>
  ),
];

const steps = [
  {
    num: "01",
    title: "Conecta ao seu sistema",
    body: "Integra com os ERPs e sistemas mais usados por pequenas empresas. Sem migração, sem perda de dados, sem recomeçar do zero.",
  },
  {
    num: "02",
    title: "Você pergunta, ele responde",
    body: 'Direto no WhatsApp. "Qual produto me dá mais lucro?" "Tenho estoque encalhado?" "Como foi minha semana?" — em segundos.',
  },
  {
    num: "03",
    title: "Decisão na hora, sem enrolação",
    body: "A resposta chega em linguagem de negócio — não em gráficos técnicos. Você decide. Você age. Você cresce.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white" id="como-funciona">
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <span className="section-label">A solução</span>
        <h2
          className="font-display font-extrabold tracking-tight mt-4 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--display-md)",
            color: "#0a0a0a",
          }}
        >
          Da tela do ERP
          <br />
          para a sua decisão
        </h2>
        <p
          className="mt-4 text-base leading-relaxed max-w-lg"
          style={{ color: "#555555" }}
        >
          O Data Pocket se conecta ao sistema que você já tem e entrega a resposta
          que você precisa — na linguagem do seu negócio, quando você precisar.
        </p>

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Linha vertical */}
          <div
            className="absolute left-[15px] top-0 bottom-0 timeline-line hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {steps.map((s, i) => {
              const Artifact = stepArtifacts[i];
              return (
                <div key={s.num} className="flex gap-8 sm:gap-12 pb-12 last:pb-0">
                  {/* Node do timeline */}
                  <div className="relative flex-shrink-0 hidden sm:flex items-start pt-0.5">
                    <div
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 bg-white"
                      style={{ borderColor: "#22c55e" }}
                    >
                      <span
                        className="text-[9px] font-black tabular-nums"
                        style={{ color: "#22c55e" }}
                      >
                        {s.num}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 grid sm:grid-cols-2 gap-6 items-start">
                    {/* Texto */}
                    <div>
                      {/* Número em mobile (sem timeline) */}
                      <span
                        className="sm:hidden text-xs font-bold tracking-widest tabular-nums mb-2 inline-block"
                        style={{ color: "#22c55e" }}
                      >
                        {s.num}
                      </span>
                      <h3
                        className="font-bold text-lg mb-2"
                        style={{ color: "#0a0a0a" }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#555555" }}
                      >
                        {s.body}
                      </p>
                    </div>

                    {/* Artefato contextual */}
                    <Artifact />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
