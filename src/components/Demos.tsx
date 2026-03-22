"use client";

import { useState } from "react";
import { chatScripts } from "@/data/chats";
import WhatsAppChat from "./WhatsAppChat";

export default function Demos() {
  const [activeId, setActiveId] = useState(chatScripts[0].id);
  const active = chatScripts.find((s) => s.id === activeId)!;

  return (
    <section style={{ background: "#fafaf9" }} id="demos">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <span className="section-label">Veja na prática</span>
        <h2
          className="font-display font-extrabold tracking-tight mt-4 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--display-md)",
            color: "#0a0a0a",
          }}
        >
          Como o Data Pocket responde
          <br />
          para cada tipo de negócio
        </h2>
        <p
          className="mt-4 text-base leading-relaxed max-w-lg"
          style={{ color: "#555555" }}
        >
          Exemplos reais de como empreendedores usam o Data Pocket no dia a dia.
        </p>

        {/* Tabs — underline style */}
        <div
          className="flex gap-0 mt-10 mb-10 border-b overflow-x-auto"
          style={{ borderColor: "#e8e4de" }}
          role="tablist"
        >
          {chatScripts.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeId === s.id}
              onClick={() => setActiveId(s.id)}
              className="flex-shrink-0 px-5 pb-3 pt-1 text-sm font-semibold transition-all duration-150 border-b-2 -mb-px"
              style={{
                borderColor: activeId === s.id ? "#22c55e" : "transparent",
                color: activeId === s.id ? "#0a0a0a" : "#999999",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Chat simulator */}
          <div>
            <p
              className="flex items-center gap-2 text-xs mb-4"
              style={{ color: "#aaaaaa" }}
            >
              <span
                className="animate-pulse-dot w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
              />
              Conversa ao vivo — atualiza automaticamente
            </p>
            <WhatsAppChat script={active} isActive={true} key={active.id} />
          </div>

          {/* Insight panel — sem card box */}
          <div className="pt-8">
            <span className="section-label mb-4 inline-block">
              {active.insight.tag}
            </span>
            <h3
              className="font-bold text-xl leading-snug mb-6"
              style={{
                color: "#0a0a0a",
                borderLeft: "3px solid #22c55e",
                paddingLeft: "16px",
              }}
            >
              {active.insight.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {active.insight.bullets.map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  {/* Ícone checkmark SVG */}
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(34,197,94,0.1)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1.5 5.5l2.5 2.5 4.5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#444444" }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA inline */}
            <div
              className="mt-10 pt-6 border-t flex items-center gap-4"
              style={{ borderColor: "#e8e4de" }}
            >
              <a
                href="#waitlist"
                className="text-sm font-semibold transition-colors duration-150"
                style={{ color: "#22c55e" }}
              >
                Quero usar isso no meu negócio →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
