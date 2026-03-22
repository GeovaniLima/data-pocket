import Link from "next/link";

const proofPoints = [
  {
    num: "82%",
    label: "dos empreendedores já tiveram prejuízo por falta de dados acessíveis",
  },
  {
    num: "100%",
    label: "mudariam suas decisões com uma visão unificada do negócio",
  },
  {
    num: "91%",
    label: "pagariam por uma solução de visão clara do negócio",
  },
];

export default function Hero() {
  return (
    <section className="text-center px-5 pt-16 pb-20 max-w-3xl mx-auto">
      {/* Badge */}
      <div className="inline-block bg-[#10E898]/10 border border-[#10E898]/25 text-[#10E898] text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-7">
        🚀 Lançamento em breve — vagas limitadas
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white mb-5 animate-fade-in-up">
        Você já tem os dados.
        <br />
        <span className="gradient-text">Só faltava a resposta certa.</span>
      </h1>

      {/* Sub */}
      <p
        className="text-base sm:text-lg text-[#8888AA] max-w-xl mx-auto leading-relaxed mb-9 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        O Data Pocket conecta ao sistema que você já usa e transforma os dados
        do seu negócio em decisões simples, rápidas e confiáveis — direto no
        WhatsApp, em segundos.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row gap-3 justify-center mb-14 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <Link
          href="#waitlist"
          className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-[#6C3DE8] text-white font-semibold text-base shadow-[0_8px_40px_rgba(108,61,232,0.35)] hover:bg-[#4F2AB8] hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(108,61,232,0.5)] transition-all duration-200"
        >
          Quero entrar na lista de espera
        </Link>
        <Link
          href="#como-funciona"
          className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/10 text-[#8888AA] font-semibold text-base hover:border-white/20 hover:text-white transition-all duration-200"
        >
          Ver como funciona
        </Link>
      </div>

      {/* Proof */}
      <div
        className="bg-[#12121A] border border-white/8 rounded-2xl p-6 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/8">
          {proofPoints.map((p) => (
            <div
              key={p.num}
              className="flex flex-col items-center gap-1.5 px-6 py-3 flex-1"
            >
              <span className="gradient-text text-3xl sm:text-4xl font-black tracking-tight leading-none">
                {p.num}
              </span>
              <span className="text-[#8888AA] text-xs leading-snug text-center max-w-[160px]">
                {p.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[#333355] text-xs mt-4 text-center">
          Pesquisa de campo Data Pocket — março/2026 (n=11, 8 segmentos)
        </p>
      </div>
    </section>
  );
}
