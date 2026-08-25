import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Lançao - Desenvolvedor Full Stack | React, Node.js, Next.js",
  description: "Portfólio interativo de Alex Lançao. Desenvolvedor Full Stack especializado em React, Node.js, Next.js, Tailwind CSS e TypeScript.",
  keywords: ["Desenvolvedor Full Stack", "Frontend", "Backend", "React", "Next.js", "Node.js", "TypeScript", "Alex Lançao", "Portfólio"],
  authors: [{ name: "Alex Lançao" }],
  openGraph: {
    title: "Alex Lançao - Desenvolvedor Full Stack",
    description: "Portfólio interativo de Alex Lançao. Explore meus projetos, experiências e skills em um ambiente estilo macOS.",
    url: "https://alexlan.com",
    siteName: "Portfólio - Alex Lançao",
    images: [
      {
        url: "https://github.com/lancao2.png",
        width: 400,
        height: 400,
        alt: "Alex Lançao - Desenvolvedor Full Stack",
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Lançao - Desenvolvedor Full Stack",
    description: "Portfólio interativo de Alex Lançao. Explore meus projetos e skills (React, Node.js, Next.js).",
    images: ["https://github.com/lancao2.png"],
  },
  icons: {
    icon: [
      { url: '/icon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

import { MenuBar } from "@/components/os/MenuBar";
import { Dock } from "@/components/os/Dock";
import { OSProvider } from "@/contexts/OSContext";
import { NextAuthProvider } from "@/components/providers/SessionProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body 
        className="h-screen w-screen overflow-hidden flex flex-col text-slate-900"
        style={{ 
          backgroundImage: "url('/wallpaper.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      >
        <NextAuthProvider>
          <OSProvider>
            <MenuBar />
            
            {/* O container principal das janelas/ícones ocupará o espaço restante */}
            <main className="flex-1 relative mt-7 z-0">
              {children}
            </main>

            <Dock />
          </OSProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
