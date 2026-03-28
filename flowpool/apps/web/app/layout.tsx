import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "04Cash - Gestão Financeira e Previdência em 0.4s",
  description: "A conta inteligente para trabalhadores autônomos que transforma cada Pix em investimento automático. Powered by Monad.",
  generator: "v0.app",
  keywords: ["04Cash", "fintech", "previdência", "autônomos", "pix", "investimento", "monad", "blockchain"],
  authors: [{ name: "04Cash" }]
};

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
