"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { lettersData } from "@/lib/data";
import { isUnlocked, formatDate } from "@/lib/dates";
import { saveReply, subscribeToReplies } from "@/lib/firebase";
import { config } from "@/lib/config";

export default function Letters() {
  const [mounted, setMounted] = useState(false);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const unsub = subscribeToReplies((data) => setReplies(data));
    return unsub;
  }, []);

  const checkUnlocked = (date: string) => (mounted ? isUnlocked(date) : false);

  const handleSave = async (date: string) => {
    const text = drafts[date]?.trim();
    if (!text) return;
    setSaving(date);
    await saveReply(date, text);
    setReplies((prev) => ({ ...prev, [date]: text }));
    setSaving(null);
  };

  return (
    <section id="letters" className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Love Letters</h2>
      <div className="flex flex-col gap-6">
        {lettersData.map((item) => {
          const unlocked = checkUnlocked(item.date);
          const reply = replies[item.date] || "";

          return (
            <div
              key={item.date}
              className={`bg-white rounded-xl p-6 shadow-md border-t-[3px] transition-all ${
                unlocked
                  ? "border-pink-400 opacity-100"
                  : "border-gray-300 opacity-50 grayscale blur-[1px] pointer-events-none"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-pink-700">
                  {unlocked ? "💌" : "🔒"} {item.day}
                </span>
                <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
              </div>

              {unlocked ? (
                <>
                  {item.photo && (
                    <div className="mb-4 -mx-6 -mt-6">
                      <Image
                        src={item.photo}
                        alt={item.day}
                        width={600}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        className="rounded-t-xl"
                      />
                    </div>
                  )}
                  <p className="text-gray-700 text-sm leading-7 whitespace-pre-wrap mb-4">
                    {item.letter}
                  </p>

                  {/* Saved reply */}
                  {reply && (
                    <div className="mb-4 p-3 bg-pink-50 rounded-lg border-l-[3px] border-pink-400">
                      <p className="text-xs font-semibold text-pink-700 mb-1">Your Reply:</p>
                      <p className="text-sm text-gray-700">{reply}</p>
                    </div>
                  )}

                  {/* Reply area */}
                  <div className="border-t border-gray-100 pt-4">
                    <textarea
                      className="w-full min-h-[80px] border-2 border-gray-200 rounded-lg p-3 text-sm resize-y focus:outline-none focus:border-pink-400 transition-colors"
                      placeholder="Write your reply here..."
                      value={drafts[item.date] ?? reply}
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [item.date]: e.target.value }))
                      }
                    />
                    <p className="text-xs text-gray-400 italic mt-1 mb-2">{config.recipientPronoun}&apos;ll be able to read your reply 💕</p>
                    <button
                      onClick={() => handleSave(item.date)}
                      className="px-5 py-2 bg-pink-500 text-white text-sm font-semibold rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                    >
                      {saving === item.date ? "Sending..." : "💌 Send a Letter Back"}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-400 py-4 text-lg">
                  This letter unlocks on {formatDate(item.date)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
