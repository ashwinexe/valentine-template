import { config } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="text-center py-8 px-6 text-gray-400 text-sm">
      <p>Made with love, {config.senderName}.</p>
      <a href="#hero" className="text-pink-400 no-underline hover:underline mt-1 inline-block">
        Back to top
      </a>
    </footer>
  );
}
