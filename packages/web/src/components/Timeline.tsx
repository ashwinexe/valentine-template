"use client";

import { useEffect, useState } from "react";
import { timelineData } from "@/lib/data";
import { isUnlocked, formatDate } from "@/lib/dates";

export default function Timeline() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch — render locked state on server, real state after mount
  const checkUnlocked = (date: string) => (mounted ? isUnlocked(date) : false);

  return (
    <section id="timeline" className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Our Love Timeline</h2>
      <div className="flex flex-col gap-5">
        {timelineData.map((item) => {
          const unlocked = checkUnlocked(item.date);
          return (
            <div
              key={item.date}
              className={`bg-white rounded-xl p-5 shadow-md border-l-4 transition-all ${
                unlocked
                  ? "border-pink-400 opacity-100"
                  : "border-gray-300 opacity-50 grayscale blur-[1px] pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{unlocked ? item.icon : "🔒"}</span>
                <span className="font-bold text-pink-700">{item.title}</span>
                <span className="text-xs text-gray-400 ml-auto">{formatDate(item.date)}</span>
              </div>
              {unlocked ? (
                <p className="text-gray-700 text-sm">{item.message}</p>
              ) : (
                <p className="text-center text-gray-400 py-2">Unlocks on {formatDate(item.date)}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
