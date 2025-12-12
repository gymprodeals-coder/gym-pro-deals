"use client";

import { useState, useMemo } from "react";
import { Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/api";

const CATEGORY_ORDER = [
    "Whey Protein",
    "Creatine",
    "Pre-Workout",
    "BCAA",
    "Vitamins",
    "Mass Gainer",
    "Supplements"
];

export default function HomeContent({ products }: { products: Product[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Grouping Logic
    const groupedProducts = useMemo(() => {
        const groups: Record<string, Product[]> = {};

        // 1. Filter first
        const filtered = products.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // 2. Group
        filtered.forEach((product) => {
            const cat = product.category || "Supplements";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(product);
        });

        // 3. Sort within groups by Price (Lowest First)
        Object.keys(groups).forEach(cat => {
            groups[cat].sort((a, b) => a.price - b.price);
        });

        return groups;
    }, [products, searchQuery]);

    return (
        <main className="min-h-screen bg-gray-100">

            {/* ---------------- HERO SECTION ---------------- */}
            <section className="relative bg-[#0a0a0a] pt-32 pb-24 flex flex-col items-center text-center px-4 overflow-hidden rounded-b-[3rem] shadow-2xl z-10">

                {/* Background Effects */}
                <div className="absolute top-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/15 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                        Find Your Best <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Supplement Deals
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
                        We track prices across <span className="text-white font-bold">Amazon, Flipkart, & HealthKart</span> so you never overpay for your gains.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto flex shadow-2xl rounded-full overflow-hidden bg-white group focus-within:ring-4 focus-within:ring-[var(--primary)]/30 transition-all">
                        <input
                            type="text"
                            placeholder="Search for 'Whey Protein'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-black placeholder-gray-500 py-4 pl-8 pr-36 text-lg font-medium focus:outline-none"
                        />
                        <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[var(--primary)] hover:bg-pink-600 text-white font-bold px-8 rounded-full transition-all flex items-center justify-center gap-2">
                            <Search size={20} strokeWidth={3} />
                            Search
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* ---------------- MAIN CONTENT ---------------- */}
            <div className="container mx-auto px-4 py-16 space-y-20">

                {/* Categories Strip */}
                <section id="categories" className="scroll-mt-28">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Browse Categories</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {CATEGORY_ORDER.map((cat, i) => (
                            <button
                                key={i}
                                className="bg-white hover:bg-white text-gray-700 hover:text-[var(--primary)] font-bold py-3 px-6 rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-[var(--primary)] transition-all whitespace-nowrap"
                                onClick={() => {
                                    const el = document.getElementById(`cat-${cat}`);
                                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Deals Section Marker */}
                <div id="featured-deals" className="scroll-mt-28" />

                {Object.keys(groupedProducts).length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No products found for "{searchQuery}"</p>
                        <p className="text-sm mt-2">Try searching for generic terms like "Whey" or "Creatine"</p>
                    </div>
                ) : (
                    /* ---------------- SEQUENTIAL LISTING BY CATEGORY ---------------- */
                    CATEGORY_ORDER.map((category) => {
                        const deals = groupedProducts[category];
                        if (!deals || deals.length === 0) return null;

                        return (
                            <section key={category} id={`cat-${category}`} className="scroll-mt-28">
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                                        {category}
                                        <span className="text-sm font-medium bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{deals.length} deals</span>
                                    </h2>
                                    <button className="text-[var(--primary)] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        View All <ChevronRight size={16} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {deals.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            title={product.title}
                                            brand={product.brand}
                                            image_url={product.image_url}
                                            price={product.price}
                                            original_price={product.original_price}
                                            rating={product.rating}
                                            stores={product.stores}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })
                )}
            </div>

            {/* ---------------- NEWSLETTER ---------------- */}
            <section id="newsletter" className="bg-[#111] py-20 text-center relative overflow-hidden mt-20 border-t border-gray-800 scroll-mt-28">
                <div className="relative z-10 container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Price Drop</h2>
                    <p className="text-gray-400 mb-8">
                        Join 10,000+ gym goers saving money on supplements.
                    </p>

                    <form className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-gray-700 focus-within:border-[var(--primary)] transition-colors">
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="flex-grow bg-transparent text-white px-4 py-3 focus:outline-none"
                        />
                        <button className="bg-[var(--primary)] hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-transform active:scale-95">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
