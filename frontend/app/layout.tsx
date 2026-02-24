import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
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
    description: "Compare prices for whey protein, creatine, and pre-workouts across Amazon, Flipkart, and HealthKart. Get the best gym supplement deals.",
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: `${siteConfig.name} - Save on Supplements`,
      description: "Compare prices for whey protein, creatine, and pre-workouts across Amazon, Flipkart, and HealthKart. Get the best gym supplement deals.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-gray-100`}
        style={
          {
            "--primary": siteConfig.theme.primary,
            "--background": "#0a0a0a",
            "--foreground": "#f3f4f6",
            "--muted-foreground": "#9ca3af",
          } as React.CSSProperties
        }
      >
        {children}
        <GoogleAnalytics gaId="G-YSFKDYV8W7" />
        <Script id="cuelinks-script" strategy="beforeInteractive">
          {`
            var cuelinks_widget = cuelinks_widget || [];
            cuelinks_widget.push({
              widget_version: 'v2'
            });
          `}
        </Script>
        <Script src="https://affiliate.cuelinks.com/js/widget/v2/cuelinks_widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
