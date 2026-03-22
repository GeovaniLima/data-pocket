"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChatScript, ChatMessage } from "@/data/chats";

type Props = { script: ChatScript; isActive: boolean };
type RenderedMessage = ChatMessage & { id: number };

const TYPING_DURATION = 900;

function formatText(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function WhatsAppChat({ script, isActive }: Props) {
  const [messages, setMessages] = useState<RenderedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const counterRef = useRef(0);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

  const runScript = useCallback(() => {
    clearTimeouts();
    setMessages([]);
    setIsTyping(false);
    counterRef.current = 0;
    let cumulative = 500;

    script.messages.forEach((msg) => {
      cumulative += msg.delay;
      if (msg.from === "bot") {
        const t1 = setTimeout(() => { setIsTyping(true); scrollToBottom(); }, cumulative);
        timeoutsRef.current.push(t1);
        cumulative += TYPING_DURATION;
        const t2 = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { ...msg, id: counterRef.current++ }]);
          scrollToBottom();
        }, cumulative);
        timeoutsRef.current.push(t2);
      } else {
        const t = setTimeout(() => {
          setMessages((prev) => [...prev, { ...msg, id: counterRef.current++ }]);
          scrollToBottom();
        }, cumulative);
        timeoutsRef.current.push(t);
      }
    });

    cumulative += 3000;
    timeoutsRef.current.push(setTimeout(runScript, cumulative));
  }, [script, clearTimeouts, scrollToBottom]);

  useEffect(() => {
    if (isActive) { runScript(); } else { clearTimeouts(); setMessages([]); setIsTyping(false); }
    return () => clearTimeouts();
  }, [isActive, runScript, clearTimeouts]);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#e2e8f0] shadow-lg max-w-[380px] w-full mx-auto">
      {/* WhatsApp-style header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 shadow">
          <span className="text-white text-xs font-extrabold tracking-tight">DP</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-white text-sm font-bold leading-none">Data Pocket</span>
          <span className="text-[#a7f3d0] text-xs leading-none">● Online agora</span>
        </div>
      </div>

      {/* Chat body — WhatsApp wallpaper background */}
      <div
        ref={chatRef}
        className="chat-scroll p-4 flex flex-col gap-2.5 h-[340px] overflow-y-auto"
        style={{ background: "#ECE5DD" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "fadeInUp 0.25s ease both" }}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl shadow-sm ${
                msg.from === "user"
                  ? "bg-[#DCF8C6] text-[#111111] rounded-br-sm"
                  : "bg-white text-[#111111] rounded-bl-sm"
              }`}
            >
              {formatText(msg.text)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start" style={{ animation: "fadeInUp 0.2s ease both" }}>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center shadow-sm">
              <span className="typing-dot w-2 h-2 rounded-full bg-[#999999] inline-block" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#999999] inline-block" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#999999] inline-block" />
            </div>
          </div>
        )}

        {messages.length === 0 && !isTyping && (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[#999999] text-sm">Iniciando conversa...</span>
          </div>
        )}
      </div>
    </div>
  );
}
