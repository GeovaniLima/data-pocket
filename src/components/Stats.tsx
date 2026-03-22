const stats = [
  {
    num: "47M",
    label: "de brasileiros à frente de algum negócio",
    source: "GEM 2024 / Sebrae",
  },
  {
    num: "62%",
    label: "das empresas fecham em até 5 anos",
    source: "IBGE — Demo. das Empresas, 2024",
  },
  {
    num: "1,6/8",
    label: 'nota em \u201cuso de dados\u201d nas MPEs \u2014 pior entre 8 dimens\u00f5es',
    source: "Sebrae/PR + ABDI, 2024",
  },
  {
    num: "90%",
    label: "dos donos de PMEs têm dificuldade em gestão financeira",
    source: "Instituto Locomotiva / Itaú, 2024",
  },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/8 bg-gradient-to-br from-[#6C3DE8]/8 via-transparent to-transparent">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-12">
          O tamanho do problema que estamos resolvendo
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div
              key={s.num}
              className="bg-[#12121A] border border-white/8 rounded-2xl p-7 text-center hover:border-[#6C3DE8]/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="gradient-text text-4xl font-black tracking-tight mb-2">
                {s.num}
              </div>
              <div className="text-[#F0F0F8] text-sm leading-snug mb-2">
                {s.label}
              </div>
              <div className="text-[#333355] text-xs">{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
