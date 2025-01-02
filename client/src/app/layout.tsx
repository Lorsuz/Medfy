import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AuthProvider from "@drexdev/providers/auth-provider";
import { Toaster } from "@drexdev/components/ui/toaster";

export const metadata: Metadata = {
  title: "MedFy Academy - Painel do Aluno",
  description: "Painel do Aluno do MedFy Academy.",
};

const fontFamily = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body className={`${fontFamily.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
