"use client";

import type { ReactElement } from "react";
type IconComponent = () => ReactElement;

/* Ícones SVG Lucide-style para cada segmento */
const icons: Record<string, IconComponent> = {
  varejo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  farmacia: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 20H4a2 2 0 01-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H20a2 2 0 012 2v2.5" />
      <circle cx="17" cy="17" r="5" />
      <path d="M17 15v4M15 17h4" />
    </svg>
  ),
  restaurante: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  servicos: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  distribuidor: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  construcao: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20h20M5 20V10l7-7 7 7v10M9 20v-5h6v5" />
    </svg>
  ),
};

const segments = [
  {
    id: "varejo",
    title: "Comércio e Varejo",
    body: "Saiba o que mais vende, o que encalha e qual produto tem mais margem — sem abrir o sistema.",
  },
  {
    id: "farmacia",
    title: "Farmácias",
    body: "Controle de estoque, curva ABC, margem por produto e alertas de vencimento em segundos.",
  },
  {
    id: "restaurante",
    title: "Restaurantes",
    body: "Custo de prato, margem por item do cardápio, giro de insumos — sem planilha auxiliar.",
  },
  {
    id: "servicos",
    title: "Serviços e Consultorias",
    body: "Carteira de clientes, risco de churn, faturamento por cliente e oportunidades de upsell.",
  },
  {
    id: "distribuidor",
    title: "Distribuidores",
    body: "Posição de estoque, pedidos em aberto, clientes sem compra e giro por SKU.",
  },
  {
    id: "construcao",
    title: "Construção e Projetos",
    body: "Obras abertas, custo realizado vs. orçado, pagamentos pendentes e margem por projeto.",
  },
];

export default function Audience() {
  return (
    <section style={{ background: "#ffffff" }} id="para-quem">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header — left-aligned */}
        <div className="mb-12">
          <span className="section-label">Para quem é</span>
          <h2
            className="font-display font-extrabold tracking-tight mt-4 leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--display-md)",
              color: "#0a0a0a",
            }}
          >
            Para o dono que não tem tempo
            <br />
            de aprender mais uma ferramenta
          </h2>
        </div>

        {/* Scroll horizontal com edge fade */}
        <div className="segment-scroll">
          {segments.map((s) => {
            const Icon = icons[s.id];
            return (
              <div
                key={s.id}
                className="flex-shrink-0 flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 group cursor-default"
                style={{
                  minWidth: "260px",
                  maxWidth: "280px",
                  background: "#ffffff",
                  border: "1px solid #e8e4de",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#22c55e";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 24px rgba(34,197,94,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#e8e4de";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Ícone */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f7f8f7", color: "#0a0a0a" }}
                >
                  <Icon />
                </div>

                {/* Texto */}
                <div>
                  <h3
                    className="font-bold text-sm mb-1.5"
                    style={{ color: "#0a0a0a" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#777777" }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link ver mais */}
        <div className="mt-6">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150"
            style={{ color: "#aaaaaa" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#22c55e")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#aaaaaa")
            }
          >
            E muito mais
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
