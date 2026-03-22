const cards = [
  {
    icon: "📊",
    title: "O dado existe, mas não chega",
    body: "Margem, ponto de equilíbrio, giro de estoque — tudo está no seu ERP. Mas em que tela? Com qual filtro? Não dá tempo de descobrir.",
  },
  {
    icon: "📓",
    title: "Planilha e caderno não são solução",
    body: "73% dos empreendedores usam controles paralelos para compensar o que o sistema não mostra. É sinal de que a ferramenta falhou, não você.",
  },
  {
    icon: "⏱️",
    title: "Você não tem tempo a perder",
    body: "Com 50+ horas por semana e 98% das decisões nas suas mãos, você precisa da resposta agora — não depois de um relatório de 3 horas.",
  },
];

export default function Problem() {
  return (
    <section className="py-20 bg-[#12121A] border-y border-white/8">
      <div className="max-w-5xl mx-auto px-5">
        {/* Tag + title */}
        <Tag>O problema real</Tag>
        <h2 className="section-title mt-4">
          Você tem sistema. Ainda assim decide no escuro.
        </h2>
        <p className="section-sub mt-4">
          7 em cada 10 empreendedores que entrevistamos já usam ERP ou sistema
          de gestão. Mesmo assim, 73% tomam decisões sem dados — e 82% já
          sofreram prejuízo por isso.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mt-10">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#0A0A0F] border border-white/8 rounded-2xl p-7 hover:border-[#6C3DE8]/30 transition-colors"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{c.title}</h3>
              <p className="text-[#8888AA] text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mt-8 bg-gradient-to-r from-[#6C3DE8]/8 to-[#10E898]/5 border border-[#6C3DE8]/20 border-l-4 border-l-[#6C3DE8] rounded-xl px-7 py-6">
          <p className="text-base italic text-[#F0F0F8] leading-relaxed mb-2">
            "Há empresários que comemoram aumento de vendas sem perceber que a
            margem está caindo. Trabalham mais, faturam mais, mas lucram menos."
          </p>
          <cite className="text-xs text-[#8888AA]">
            — CartaCapital / Sebrae, 2025
          </cite>
        </blockquote>
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
