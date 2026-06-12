import type { Metadata } from "next";
import { Atkinson_Hyperlegible, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="pt-BR" className={`${atkinson.variable} ${dmSerif.variable} antialiased`}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
