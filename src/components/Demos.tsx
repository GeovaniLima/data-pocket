"use client";

import { useState } from "react";
import { chatScripts } from "@/data/chats";
import WhatsAppChat from "./WhatsAppChat";

export default function Demos() {
  const [activeId, setActiveId] = useState(chatScripts[0].id);

  const active = chatScripts.find((s) => s.id === activeId)!;

  return (
    <section
      className="py-20 bg-[#12121A] border-y border-white/8"
      id="demos"
    >
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <Tag>Veja na prática</Tag>
        <h2 className="section-title mt-4">
          Como o Data Pocket responde
          <br />
          para cada tipo de negócio
        </h2>
        <p className="section-sub mt-4 mb-9">
          Exemplos reais de como empreendedores usam o Data Pocket no dia a
          dia — como uma conversa de WhatsApp.
        </p>

        {/* Tabs */}
        <div className="tab-scroll flex gap-2 mb-9">
          {chatScripts.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                activeId === s.id
                  ? "bg-[#6C3DE8] text-white border-[#6C3DE8] shadow-[0_4px_20px_rgba(108,61,232,0.4)]"
                  : "bg-[#0A0A0F] text-[#8888AA] border-white/8 hover:text-white hover:border-white/20"
              }`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Phone */}
          <WhatsAppChat script={active} isActive={true} key={active.id} />

          {/* Insight */}
          <div className="bg-[#0A0A0F] border border-white/8 rounded-2xl p-8">
            <span className="inline-block bg-[#10E898]/10 border border-[#10E898]/25 text-[#10E898] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {active.insight.tag}
            </span>
            <h3 className="text-white font-bold text-lg leading-snug mb-5">
              {active.insight.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {active.insight.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-[#8888AA] leading-relaxed">
                  <span className="text-[#10E898] mt-0.5 flex-shrink-0">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Live indicator */}
            <div className="mt-8 flex items-center gap-2 text-xs text-[#444466]">
              <span className="w-2 h-2 rounded-full bg-[#10E898] animate-pulse inline-block" />
              Conversa ao vivo — atualiza automaticamente
            </div>
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
