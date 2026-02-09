"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-pink-700 mb-2">This is for someone special</h1>
        <p className="text-gray-500 text-sm mb-6">Enter the password to continue</p>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 mb-3 focus:border-pink-400 focus:outline-none"
          placeholder="Password"
        />
        {error && <p className="text-red-500 text-sm mb-3">Wrong password, try again</p>}
        <button type="submit" className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors cursor-pointer">
          Unlock
        </button>
      </form>
    </div>
  );
}
