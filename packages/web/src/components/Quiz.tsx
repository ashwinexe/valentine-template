"use client";

import { useState } from "react";
import { quizData } from "@/lib/data";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (index >= quizData.length) {
    return (
      <section id="quiz" className="max-w-xl mx-auto px-6 py-12">
        <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Love Quiz</h2>
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <div className="text-4xl animate-bounce mb-4">💕 💖 💕</div>
          <h3 className="text-2xl font-bold text-pink-700 mb-2">You completed the Love Quiz!</h3>
          <p className="text-gray-500">Thanks for playing, you&apos;re the best! ❤️</p>
        </div>
      </section>
    );
  }

  const q = quizData[index];
  const isCorrect = q.isFinale || selected === q.correct;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  const handleNext = () => {
    setIndex(index + 1);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <section id="quiz" className="max-w-xl mx-auto px-6 py-12">
      <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Love Quiz</h2>
      <div className="bg-white rounded-xl p-6 shadow-md text-center">
        <p className="text-xs text-gray-400 mb-3">
          Question {index + 1} of {quizData.length}
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-5">{q.q}</p>

        <div className="flex flex-col gap-2.5 mb-4">
          {q.options.map((opt, i) => {
            let cls = "px-4 py-3 border-2 rounded-lg text-left text-sm transition-all cursor-pointer ";
            if (!answered) {
              cls += "border-gray-200 bg-gray-50 hover:border-pink-400 hover:bg-pink-50";
            } else if (i === selected) {
              cls += isCorrect
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50";
            } else if (i === q.correct && !q.isFinale) {
              cls += "border-green-400 bg-green-50 opacity-70";
            } else {
              cls += "border-gray-200 bg-gray-50 opacity-50";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={cls}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className="flex flex-col items-center gap-2 mb-4 p-3 rounded-lg bg-gray-50">
            <span className="text-5xl" role="img" aria-label={isCorrect ? "Thumbs up" : "Thumbs down"}>
              {isCorrect ? "👍" : "👎"}
            </span>
            <p className="text-sm text-gray-600">
              {q.isFinale ? q.feedback.right : isCorrect ? q.feedback.right : q.feedback.wrong}
            </p>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!answered}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
            answered
              ? "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {index === quizData.length - 1 ? "See Results ❤️" : "Next →"}
        </button>
      </div>
    </section>
  );
}
