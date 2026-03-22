import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Logo />

        <div className="flex items-center gap-6">
          <Link
            href="#como-funciona"
            className="hidden sm:block text-sm font-medium text-[#555555] hover:text-[#0a0a0a] transition-colors tracking-tight"
          >
            Como funciona
          </Link>
          <Link
            href="#waitlist"
            className="text-sm font-semibold text-white bg-[#22c55e] px-5 py-2.5 rounded-lg hover:bg-[#16a34a] transition-all duration-200 tracking-tight shadow-[0_4px_16px_rgba(34,197,94,0.25)]"
          >
            Entrar na lista
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <img
      src="/logo_nova.png"
      alt="Data Pocket"
      style={{
        height: "44px",
        width: "auto",
        filter: light ? "brightness(0) invert(1)" : "none",
      }}
    />
  );
}
