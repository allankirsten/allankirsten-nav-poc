import type { Metadata } from "next";
import Script from "next/script";
import { Atkinson_Hyperlegible, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import PersonJsonLd from "@/components/PersonJsonLd";

const GA_MEASUREMENT_ID = "G-FSBTENKVS7";

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
  title: "Allan Kirsten's Portfolio 2026",
  description: "Allan Kirsten, product design portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${atkinson.variable} ${dmSerif.variable} antialiased`}>
      <body>
        <PersonJsonLd />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
