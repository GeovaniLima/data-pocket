import Link from "next/link";

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Para quem é", href: "#para-quem" },
  { label: "Ver demos", href: "#demos" },
  { label: "Lista de espera", href: "#waitlist" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Data <span style={{ color: "#22c55e" }}>Pocket</span>
            </span>
            <p className="text-sm leading-relaxed text-white/40">
              O dado que você já tem,<br />finalmente na sua mão.
            </p>
            <span className="text-xs mt-2 text-white/20">
              Feito no Brasil 🇧🇷
            </span>
          </div>

          {/* Col 2 — Navegação */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-white/25">
              Navegação
            </span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/45 hover:text-white/90 transition-colors duration-150"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contato */}
          <div className="flex flex-col gap-4">
            <span className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase text-white/25">
              Contato
            </span>
            <a
              href="mailto:contato@datapocket.com.br"
              className="text-sm text-white/45 hover:text-[#22c55e] transition-colors duration-150"
            >
              contato@datapocket.com.br
            </a>
            <div
              className="flex items-center gap-2 text-xs mt-1 px-3 py-2 rounded-lg border text-white/30"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
              />
              Pesquisa de campo · n=11 · março/2026
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/20">
            © 2026 Data Pocket. Todos os direitos reservados.
          </span>
          <span className="text-xs text-white/20">
            Política de privacidade
          </span>
        </div>
      </div>
    </footer>
  );
}
