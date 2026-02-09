"use client";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-pink-50/95 backdrop-blur-md border-b border-pink-200/30">
      <a href="#hero" className="font-bold text-pink-700 text-lg no-underline">
        Our Valentine Week
      </a>
      <div className="flex gap-5">
        {["Timeline", "Terminal", "Quiz", "Letters"].map((s) => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            className="text-sm font-medium text-gray-500 hover:text-pink-500 transition-colors no-underline"
          >
            {s}
          </a>
        ))}
      </div>
    </nav>
  );
}
