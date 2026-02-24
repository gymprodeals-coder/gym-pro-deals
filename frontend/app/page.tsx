"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchProducts, type Product } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Could not load deals at the moment.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://gymprodeals.in",
    "name": "GymProDeals",
    "description": "Compare prices for whey protein, creatine, and pre-workouts across Amazon, Flipkart, and HealthKart. Get the best gym supplement deals.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {loading ? (
        <main className="min-h-screen bg-[#0a0a0a]">
          <div className="bg-[#111] h-[400px] w-full rounded-b-[3rem] mb-12 animate-pulse" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </main>
      ) : (
        <HomeContent products={products} />
      )}

      <Footer />
    </>
  );
}
