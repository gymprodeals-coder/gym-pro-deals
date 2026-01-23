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
  title: "GymPro Deals | Best Price Supplement Price Tracker in India",
  description: "Compare prices for Whey Protein, Creatine, and Gym Gear from Amazon, Flipkart & HealthKart. Track price drops and save money on your gains.",
  keywords: ["gym deals", "whey protein price", "creatine price", "supplement offers", "gym gear india", "price tracker"],
  authors: [{ name: "GymPro Deals" }],
  openGraph: {
    title: "GymPro Deals - Save on Supplements",
    description: "Never overpay for supplements again. Real-time price tracking across top Indian stores.",
    url: "https://gymprodeals.in",
    siteName: "GymPro Deals",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1a1a1a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
