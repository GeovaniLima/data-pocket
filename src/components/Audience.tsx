const segments = [
  {
    emoji: "🏪",
    title: "Comércio e Varejo",
    body: "Saiba o que mais vende, o que encalha, qual produto tem mais margem — sem abrir o sistema.",
  },
  {
    emoji: "💊",
    title: "Farmácias",
    body: "Controle de estoque, curva ABC, margem por produto e alertas de vencimento em segundos.",
  },
  {
    emoji: "🍽️",
    title: "Restaurantes e Alimentação",
    body: "Custo de prato, margem por item do cardápio, giro de insumos — sem planilha auxiliar.",
  },
  {
    emoji: "🔧",
    title: "Serviços e Consultorias",
    body: "Carteira de clientes, risco de churn, faturamento por cliente e oportunidades de upsell.",
  },
  {
    emoji: "📦",
    title: "Distribuidores",
    body: "Posição de estoque, pedidos em aberto, clientes sem compra e giro por SKU.",
  },
  {
    emoji: "🏗️",
    title: "Construção e Projetos",
    body: "Obras abertas, custo realizado vs. orçado, pagamentos pendentes e margem por projeto.",
  },
];

export default function Audience() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <Tag>Para quem é</Tag>
        <h2 className="section-title mt-4">
          Para o dono que não tem tempo
          <br />
          para aprender mais uma ferramenta
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {segments.map((s) => (
            <div
              key={s.title}
              className="bg-[#12121A] border border-white/8 rounded-2xl p-7 hover:border-[#6C3DE8]/35 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,61,232,0.12)] transition-all duration-200"
            >
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
              <p className="text-[#8888AA] text-sm leading-relaxed">{s.body}</p>
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
