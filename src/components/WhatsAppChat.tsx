"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChatScript, ChatMessage } from "@/data/chats";

type Props = {
  script: ChatScript;
  isActive: boolean;
};

type RenderedMessage = ChatMessage & { id: number };

const TYPING_DURATION = 900; // ms to show "typing..." before bot message appears

function formatText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split("\n").length - 1 && <br />}
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
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  const runScript = useCallback(() => {
    clearTimeouts();
    setMessages([]);
    setIsTyping(false);
    counterRef.current = 0;

    let cumulative = 500; // initial pause

    script.messages.forEach((msg) => {
      cumulative += msg.delay;

      if (msg.from === "bot") {
        // Show typing indicator before bot message
        const typingStart = cumulative;
        const t1 = setTimeout(() => {
          setIsTyping(true);
          scrollToBottom();
        }, typingStart);
        timeoutsRef.current.push(t1);

        cumulative += TYPING_DURATION;
        const t2 = setTimeout(() => {
          setIsTyping(false);
          const id = counterRef.current++;
          setMessages((prev) => [...prev, { ...msg, id }]);
          scrollToBottom();
        }, cumulative);
        timeoutsRef.current.push(t2);
      } else {
        const t = setTimeout(() => {
          const id = counterRef.current++;
          setMessages((prev) => [...prev, { ...msg, id }]);
          scrollToBottom();
        }, cumulative);
        timeoutsRef.current.push(t);
      }
    });

    // Loop: restart after last message + pause
    cumulative += 3000;
    const tLoop = setTimeout(() => {
      runScript();
    }, cumulative);
    timeoutsRef.current.push(tLoop);
  }, [script, clearTimeouts, scrollToBottom]);

  useEffect(() => {
    if (isActive) {
      runScript();
    } else {
      clearTimeouts();
      setMessages([]);
      setIsTyping(false);
    }
    return () => clearTimeouts();
  }, [isActive, runScript, clearTimeouts]);

  // Scroll whenever messages/typing changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  return (
    <div className="bg-[#1C1C2E] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl max-w-[380px] w-full mx-auto">
      {/* Header */}
      <div className="bg-[#25253A] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C3DE8] to-[#10E898] flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0 shadow-lg">
          DP
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-white text-sm font-bold leading-none">Data Pocket</span>
          <span className="text-[#10E898] text-xs leading-none">● Online agora</span>
        </div>
      </div>

      {/* Chat body */}
      <div
        ref={chatRef}
        className="chat-scroll bg-[#15152A] p-4 flex flex-col gap-2.5 h-[340px] overflow-y-auto"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "fadeInUp 0.25s ease both" }}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                msg.from === "user"
                  ? "bg-[#6C3DE8] text-white rounded-br-sm"
                  : "bg-[#25253A] text-[#F0F0F8] border border-white/5 rounded-bl-sm"
              }`}
            >
              {formatText(msg.text)}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start" style={{ animation: "fadeInUp 0.2s ease both" }}>
            <div className="bg-[#25253A] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              <span className="typing-dot w-2 h-2 rounded-full bg-[#8888AA] inline-block" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#8888AA] inline-block" />
              <span className="typing-dot w-2 h-2 rounded-full bg-[#8888AA] inline-block" />
            </div>
          </div>
        )}

        {/* Empty state so the chat doesn't look empty on mount */}
        {messages.length === 0 && !isTyping && (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[#444466] text-sm">Iniciando conversa...</span>
          </div>
        )}
      </div>
    </div>
  );
}
