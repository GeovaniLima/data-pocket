const rows = [
  ["Dashboard cheio de gráficos que ninguém entende", "Resposta em linguagem de negócio"],
  ["Precisa de treinamento para usar", "Zero treinamento — é como o WhatsApp"],
  ["Você procura o dado e não acha", "Você pergunta, ele responde em segundos"],
  ["Substitui seu ERP (migração de dados)", "Conecta ao seu ERP atual, sem migração"],
  ["Resposta em horas ou dias", "Disponível 24h, onde você estiver"],
  ["Linguagem técnica de BI", "Linguagem de dono de negócio"],
];

export default function Differentials() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <Tag>Por que Data Pocket</Tag>
        <h2 className="section-title mt-4">
          Não é mais um dashboard.
          <br />
          É a decisão que você precisava.
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {/* Others */}
          <div className="hidden sm:block rounded-2xl overflow-hidden border border-red-500/10">
            <div className="bg-red-500/8 px-6 py-4 text-center text-red-300/70 font-semibold text-base border-b border-red-500/10">
              Outros sistemas
            </div>
            {rows.map(([bad]) => (
              <div
                key={bad}
                className="px-6 py-3.5 text-sm text-[#8888AA] bg-red-500/3 border-b border-red-500/8 last:border-b last:rounded-b-2xl"
              >
                ❌ {bad}
              </div>
            ))}
          </div>

          {/* Data Pocket */}
          <div className="rounded-2xl overflow-hidden border border-[#6C3DE8]/20">
            <div className="bg-[#6C3DE8]/15 px-6 py-4 text-center text-[#8B5CF6] font-semibold text-base border-b border-[#6C3DE8]/20">
              Data Pocket ◆
            </div>
            {rows.map(([, good]) => (
              <div
                key={good}
                className="px-6 py-3.5 text-sm text-[#F0F0F8] bg-[#6C3DE8]/4 border-b border-[#6C3DE8]/10 last:border-b last:rounded-b-2xl"
              >
                ✅ {good}
              </div>
            ))}
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
