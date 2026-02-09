"use client";

import { useEffect, useState, useRef } from "react";
import { terminalMessages } from "@/lib/data";
import { config } from "@/lib/config";

function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Terminal() {
  const [displayText, setDisplayText] = useState("");
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  const todayKey = getTodayKey();
  const msg = terminalMessages[todayKey];
  const command = msg?.command || config.cliCommand;
  const fullMessage = msg?.message || "💕 No special day today, but I love you every day.\n   Come back during Valentine Week! (Feb 7–14)";

  useEffect(() => {
    indexRef.current = 0;
    setDisplayText("");
    setDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < fullMessage.length) {
        setDisplayText(fullMessage.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullMessage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="terminal" className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Love Terminal</h2>

      {/* CLI Snippet */}
      <div className="flex items-center gap-2 bg-[#1e1e2e] text-green-300 px-4 py-3 rounded-t-xl font-mono text-sm">
        <code>$ {command}</code>
        <button
          onClick={handleCopy}
          className="ml-auto bg-transparent border-none cursor-pointer text-base opacity-70 hover:opacity-100 transition-opacity"
          title="Copy command"
        >
          {copied ? "✅" : "📋"}
        </button>
      </div>

      {/* Terminal Window */}
      <div className="bg-[#1e1e2e] rounded-b-xl shadow-md overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#181825]">
          <span className="w-3 h-3 rounded-full bg-[#f38ba8]" />
          <span className="w-3 h-3 rounded-full bg-[#f9e2af]" />
          <span className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
          <span className="ml-2 text-[#6c7086] text-xs font-mono">love-terminal</span>
        </div>
        <div className="p-4 min-h-[120px] font-mono text-sm text-green-300 whitespace-pre-wrap leading-relaxed">
          <span className="text-pink-300">❯ </span>
          {displayText}
          {!done && (
            <span className="inline-block w-2 h-4 bg-green-300 align-text-bottom animate-pulse" />
          )}
        </div>
      </div>

      <a href="#hero" className="inline-block mt-4 text-pink-400 text-sm no-underline hover:underline">
        ← Back to Love Home
      </a>
    </section>
  );
}
