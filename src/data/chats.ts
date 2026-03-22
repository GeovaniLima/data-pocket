export type ChatMessage = {
  from: "user" | "bot";
  text: string;
  delay: number; // ms after previous message appears
};

export type ChatScript = {
  id: string;
  label: string;
  emoji: string;
  insight: {
    tag: string;
    title: string;
    bullets: string[];
  };
  messages: ChatMessage[];
};

export const chatScripts: ChatScript[] = [
  {
    id: "farmacia",
    label: "Farmácia",
    emoji: "💊",
    insight: {
      tag: "Resultado",
      title: "Em 30 segundos, a farmacêutica sabia exatamente o que fazer",
      bullets: [
        "Identificou o produto com maior margem da semana",
        "Descobriu R$ 6.048 parados no estoque",
        "Tomou decisão de liquidação sem abrir o sistema",
      ],
    },
    messages: [
      {
        from: "user",
        text: "Qual o remédio que mais vendi essa semana e qual a margem?",
        delay: 600,
      },
      {
        from: "bot",
        text: "Top 3 em vendas esta semana 💊\n\n1. Dipirona 500mg — 148 un. | Margem: 38%\n2. Amoxicilina 875mg — 91 un. | Margem: 31%\n3. Omeprazol 20mg — 87 un. | Margem: 42%\n\n📌 O Omeprazol tem margem maior, mas vende menos. Quer ver o potencial se você impulsioná-lo?",
        delay: 1400,
      },
      {
        from: "user",
        text: "Tem algo encalhado no estoque?",
        delay: 1200,
      },
      {
        from: "bot",
        text: "Atenção: 4 itens parados há mais de 30 dias 📦\n\n• Vitamina C efervescente — 210 un. (R$ 1.890)\n• Protetor solar FPS 50 — 87 un. (R$ 2.610)\n• Colágeno hidrolisado — 43 un. (R$ 1.548)\n\n💡 Liquidação nos itens sazonais pode liberar R$ 6.048 em capital agora.",
        delay: 1400,
      },
    ],
  },
  {
    id: "varejo",
    label: "Varejo",
    emoji: "🏪",
    insight: {
      tag: "Resultado",
      title: "O dono descobriu que trabalhava mais para lucrar menos",
      bullets: [
        "Identificou as categorias que destroem a margem",
        "Entendeu o real impacto dos descontos por vendedor",
        "Corrigiu a política comercial na semana seguinte",
      ],
    },
    messages: [
      {
        from: "user",
        text: "Como foi meu faturamento esse mês versus o mês passado?",
        delay: 600,
      },
      {
        from: "bot",
        text: "Comparativo mensal 📈\n\nMarço (até hoje): R$ 48.320\nFevereiro (total): R$ 41.750\n\n📊 Crescimento: +15,7% em faturamento\n⚠️ Margem média: caiu de 34% → 28%\n\nVocê vende mais, mas lucra menos por unidade. Quer ver quais categorias puxaram a margem para baixo?",
        delay: 1500,
      },
      {
        from: "user",
        text: "Sim! Quais categorias?",
        delay: 1000,
      },
      {
        from: "bot",
        text: "Margem por categoria — março 🔍\n\n✅ Eletrônicos: 41% (↑ vs fev)\n✅ Roupas: 38% (estável)\n⚠️ Calçados: 19% (↓ 12 p.p.)\n🔴 Acessórios: 11% (↓ 18 p.p.)\n\n💡 Acessórios e calçados derrubam sua margem geral — provavelmente desconto excessivo. Quer ver o ticket médio por vendedor?",
        delay: 1400,
      },
    ],
  },
  {
    id: "restaurante",
    label: "Restaurante",
    emoji: "🍽️",
    insight: {
      tag: "Resultado",
      title: "O restaurante parou de vender itens que davam prejuízo",
      bullets: [
        "Descobriu 2 itens vendidos abaixo do custo real",
        "Identificou o prato com maior potencial de lucro",
        "Ajustou o cardápio e o preço em 1 dia",
      ],
    },
    messages: [
      {
        from: "user",
        text: "Qual o prato que mais lucra pra mim?",
        delay: 600,
      },
      {
        from: "bot",
        text: "Ranking de lucratividade — últimos 7 dias 🍽️\n\n🥇 Frango grelhado — margem: 68% | 94 pedidos\n🥈 Salada Caesar — margem: 72% | 61 pedidos\n🥉 Parmegiana — margem: 51% | 118 pedidos\n\n💡 A Salada Caesar tem a maior margem, mas poucos pedidos. Quer sugestão de como impulsioná-la?",
        delay: 1500,
      },
      {
        from: "user",
        text: "E o que tá me dando prejuízo?",
        delay: 1000,
      },
      {
        from: "bot",
        text: "Atenção: 2 itens com margem negativa 🔴\n\n• Combo família (pizza + refri) — margem: -8%\n• Porção de batata frita G — margem: -3%\n\nEsses itens são vendidos abaixo do custo real. Reajuste de preço ou reformulação do combo eliminaria o prejuízo agora.",
        delay: 1400,
      },
    ],
  },
  {
    id: "servicos",
    label: "Serviços",
    emoji: "🔧",
    insight: {
      tag: "Resultado",
      title: "A prestadora agiu antes de perder os clientes",
      bullets: [
        "Identificou concentração de receita em 5 clientes",
        "Detectou 3 clientes com sinal de saída",
        "Retomou contato e salvou R$ 2.800/mês em risco",
      ],
    },
    messages: [
      {
        from: "user",
        text: "Quantos clientes ativos tenho e quais mais faturam?",
        delay: 600,
      },
      {
        from: "bot",
        text: "Carteira ativa (últimos 90 dias): 34 clientes 📋\n\n🏆 Top 5 por faturamento:\n1. Empresa Alpha — R$ 4.200/mês\n2. Comércio Beta — R$ 3.100/mês\n3. Loja Gamma — R$ 2.800/mês\n4. Distribuidora Delta — R$ 2.200/mês\n5. Serv. Epsilon — R$ 1.900/mês\n\n⚠️ Esses 5 representam 68% da sua receita. Risco de concentração.",
        delay: 1500,
      },
      {
        from: "user",
        text: "Tem algum cliente sumindo?",
        delay: 1000,
      },
      {
        from: "bot",
        text: "Alerta de churn: 3 clientes em risco 🚨\n\n• Empresa Zeta — sem compra há 47 dias (era mensal)\n• Loja Kappa — frequência caiu 60% em 30 dias\n• Serv. Lambda — ticket médio caiu 45%\n\n💡 Um contato proativo agora pode recuperar até R$ 2.800/mês.",
        delay: 1400,
      },
    ],
  },
];
