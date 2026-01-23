"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import type { Product } from "@/lib/api";

const API_URL = "https://prodeals-api.onrender.com/api/deals/gym";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fallback-1",
    title: "Optimum Nutrition (ON) Gold Standard 100% Whey Protein Powder - 2 kg (Double Rich Chocolate)",
    brand: "Optimum Nutrition",
    price: 6499,
    original_price: 7999,
    image_url: "https://m.media-amazon.com/images/I/716u7JQp0ZL._SL1500_.jpg",
    category: "Whey Protein",
    rating: 4.5,
    stores: [
      { name: "Amazon", price: 6499, url: "https://www.amazon.in/dp/B000QSNYGI" }
    ]
  },
  {
    id: "fallback-2",
    title: "MuscleBlaze Biozyme Performance Whey Protein - 2 kg (Rich Milk Chocolate)",
    brand: "MuscleBlaze",
    price: 4599,
    original_price: 5499,
    image_url: "https://m.media-amazon.com/images/I/61N3nUoD54L._SL1500_.jpg",
    category: "Whey Protein",
    rating: 4.4,
    stores: [
      { name: "Flipkart", price: 4599, url: "https://www.flipkart.com/muscleblaze-biozyme-performance-whey-protein/p/itm5e4e6d4c5c8e3" }
    ]
  },
  {
    id: "fallback-3",
    title: "GNC Pro Performance Creatine Monohydrate - 250 g",
    brand: "GNC",
    price: 899,
    original_price: 1299,
    image_url: "https://m.media-amazon.com/images/I/61m6-N+p8LL._SL1500_.jpg",
    category: "Creatine",
    rating: 4.3,
    stores: [
      { name: "HealthKart", price: 899, url: "https://www.healthkart.com/sv/gnc-pro-performance-creatine-monohydrate/SP-45" }
    ]
  }
];

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
        // We still set error, but we'll show fallback products if products is empty
        setError("Could not load deals at the moment. Showing latest featured supplements.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Use fallback products if API returns empty list or fails
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <>
      <Header />

      {loading ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading best deals...</p>
        </div>
      ) : (
        <HomeContent products={displayProducts} />
      )}

      <Footer />
    </>
  );
}
