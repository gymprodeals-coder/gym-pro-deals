import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://gymprodeals.in"),
  title: "Best Whey Protein & Supplement Deals in India | GymProDeals",
  description: "Compare prices for whey protein, creatine and gym supplements across Amazon, Flipkart and top stores. Find the best fitness deals updated daily.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Whey Protein & Supplement Deals in India | GymProDeals",
    description: "Compare prices for whey protein, creatine and gym supplements across Amazon, Flipkart and top stores. Find the best fitness deals updated daily.",
    url: "https://gymprodeals.in",
    siteName: "GymProDeals",
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: "your_google_search_console_verification_code_here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark text-light d-flex flex-column min-vh-100">
        <Script id="cuelinks-script" strategy="afterInteractive">
          {`
            var vglnk = {key: 'your_cuelinks_key_here'};
            (function(d, t) {
              var s = d.createElement(t); s.type = 'text/javascript'; s.async = true;
              s.src = '//cdn.cuelinks.com/js/cuelinksv2.js';
              var e = d.getElementsByTagName(t)[0]; e.parentNode.insertBefore(s, e);
            }(document, 'script'));
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
          <div className="container">
            <Link className="navbar-brand text-warning fw-bold" href="/">
              GymProDeals
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ms-auto gap-3">
                <li className="nav-item">
                  <Link href="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link href="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact" className="nav-link">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin" className="nav-link text-warning">Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container my-5 flex-grow-1">
          {children}
        </main>

        <footer className="bg-black text-center py-4 mt-auto border-top border-secondary">
          <div className="container">
            <p className="text-secondary mb-2">&copy; {new Date().getFullYear()} GymProDeals. All rights reserved.</p>
            <div className="d-flex justify-content-center gap-3">
              <Link href="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link>
              <Link href="/contact" className="text-secondary text-decoration-none">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
