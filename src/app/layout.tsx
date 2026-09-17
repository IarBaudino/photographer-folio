import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${bodoni.variable} ${inter.variable} ${jetbrains.variable} bg-surface text-on-surface antialiased selection:bg-secondary-container selection:text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
