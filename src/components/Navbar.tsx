import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0F]/85 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Logo />
        <Link
          href="#waitlist"
          className="text-sm font-semibold text-[#8B5CF6] bg-[#6C3DE8]/15 border border-[#6C3DE8]/30 px-5 py-2 rounded-full hover:bg-[#6C3DE8]/30 transition-colors"
        >
          Entrar na lista de espera
        </Link>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <span className="text-[#8B5CF6] text-xl">◆</span>
      <span>
        Data<strong className="font-black">Pocket</strong>
      </span>
    </div>
  );
}
