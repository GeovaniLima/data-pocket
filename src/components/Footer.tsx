import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/8 text-center">
      <div className="flex flex-col items-center gap-2">
        <Logo />
        <p className="text-[#8888AA] text-sm mt-1">
          O dado que você já tem, finalmente na sua mão.
        </p>
        <p className="text-[#222244] text-xs mt-3">
          © 2026 Data Pocket. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
