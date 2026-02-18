import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

import { getSiteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  return {
    title: `${siteConfig.name} | Best Price Supplement Price Tracker in India`,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: `${siteConfig.name} - Save on Supplements`,
      description: siteConfig.description,
      url: siteConfig.domain,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
        style={
          {
            "--primary": siteConfig.theme.primary,
            "--background": siteConfig.theme.background,
            "--foreground": siteConfig.theme.textPrimary,
            "--muted-foreground": siteConfig.theme.textMuted,
          } as React.CSSProperties
        }
      >
        {children}
        <GoogleAnalytics gaId="G-YSFKDYV8W7" />
      </body>
    </html>
  );
}
