"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import type { Product } from "@/lib/api";

const API_URL = "https://prodeals-api.onrender.com/api/deals/gym";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch deals");
        const data = await response.json();

        // Handle both list format and object format just in case
        const deals = Array.isArray(data) ? data : data.data || [];
        setProducts(deals);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load deals at the moment. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading best deals...</p>
        </div>
      ) : error ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-600 transition"
          >
            Try Again
          </button>
        </div>
      ) : (
        <HomeContent products={products} />
      )}

      <Footer />
    </>
  );
}
