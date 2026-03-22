import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Pocket — O dado que você já tem, finalmente na sua mão",
  description:
    "Data Pocket conecta os dados da sua planilha e transforma em decisões simples, rápidas e confiáveis — direto no WhatsApp. Sem dashboards complicados.",
  openGraph: {
    title: "Data Pocket — O dado que você já tem, finalmente na sua mão",
    description:
      "Conecta os dados da sua planilha e entrega respostas estratégicas em segundos, na linguagem do seu negócio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
