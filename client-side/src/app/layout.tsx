import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const fontFamily = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MedFy Academy - Painel",
  description: "Painel de controle do MedFy Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${fontFamily.className}`}>{children}</body>
    </html>
  );
}
