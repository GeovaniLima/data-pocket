import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Pocket — O dado que você já tem, finalmente na sua mão",
  description:
    "Data Pocket transforma os dados do seu negócio em decisões simples, rápidas e confiáveis — direto no WhatsApp. Sem dashboards complicados. Sem planilhas.",
  openGraph: {
    title: "Data Pocket — O dado que você já tem, finalmente na sua mão",
    description:
      "Conecta ao sistema que você já usa e entrega respostas estratégicas em segundos, na linguagem do seu negócio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
