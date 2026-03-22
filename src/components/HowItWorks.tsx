const steps = [
  {
    num: "01",
    title: "Conecta ao seu sistema",
    body: "Integra com os ERPs e sistemas mais usados por pequenas empresas. Sem migração, sem perda de dados, sem recomeçar do zero.",
  },
  {
    num: "02",
    title: "Você pergunta, ele responde",
    body: 'Direto no WhatsApp. \u201cQual produto me dá mais lucro?\u201d \u201cTenho estoque encalhado?\u201d \u201cComo foi minha semana?\u201d \u2014 em segundos.',
  },
  {
    num: "03",
    title: "Decisão na hora, sem enrolação",
    body: "A resposta chega em linguagem de negócio — não em gráficos técnicos. Você decide. Você age. Você cresce.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20" id="como-funciona">
      <div className="max-w-5xl mx-auto px-5">
        <Tag>A solução</Tag>
        <h2 className="section-title mt-4">
          A última milha do dado:
          <br />
          da tela do ERP para a sua decisão
        </h2>
        <p className="section-sub mt-4">
          O Data Pocket não é mais um dashboard. Ele se conecta ao sistema que
          você já tem e entrega a resposta que você precisa — na linguagem do
          seu negócio, quando você precisar.
        </p>

        <div className="mt-12 flex flex-col divide-y divide-white/8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 py-8 items-start">
              <span className="text-5xl font-black text-[#6C3DE8]/20 leading-none tracking-tight min-w-[56px] tabular-nums">
                {s.num}
              </span>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#8888AA] text-sm leading-relaxed max-w-xl">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
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
