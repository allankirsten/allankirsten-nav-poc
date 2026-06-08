import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "700", "800"],
});

export const metadata: Metadata = {
  title: "Allan Kirsten — POC Nav",
  description: "Navigation component POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${bricolage.variable} antialiased`}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
