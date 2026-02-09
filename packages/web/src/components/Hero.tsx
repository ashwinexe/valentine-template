import { config } from "@/lib/config";

export default function Hero() {
  return (
    <section id="hero" className="text-center py-20 px-6 bg-gradient-to-br from-pink-50 to-pink-100">
      <h1 className="text-4xl font-bold text-pink-700 mb-2">
         Happy Valentine Week {config.recipientName}
      </h1>
      <p className="text-gray-500 text-lg">A little something special, just for you.</p>
    </section>
  );
}
