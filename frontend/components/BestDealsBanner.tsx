"use client";

import { useMemo } from "react";
import { ExternalLink, Star, Tag, TrendingDown } from "lucide-react";
import { Product } from "@/lib/api";

export default function BestDealsBanner({ products }: { products: Product[] }) {

    // Logic to find top 3 deals by discount percentage
    const topDeals = useMemo(() => {
        if (!products || products.length === 0) return [];

        const withDiscount = products.map(p => {
            let discount = 0;
            if (p.original_price && p.price && p.original_price > p.price) {
                discount = Math.round(((p.original_price - p.price) / p.original_price) * 100);
            }
            return { ...p, discount };
        });

        // Sort by discount descending
        return withDiscount.sort((a, b) => b.discount - a.discount).slice(0, 3);
    }, [products]);

    if (topDeals.length === 0) return null;

    return (
        <section className="container mx-auto px-4 mt-[-4rem] relative z-20 mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-400 p-2 rounded-lg text-black animate-pulse">
                        <Star size={24} fill="black" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
                            Todays Top Drops
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">Highest discounts across all stores</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topDeals.map((deal) => (
                        <div key={deal.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all hover:shadow-lg group">
                            {/* Image */}
                            <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 border border-gray-100">
                                <img
                                    src={deal.image_url}
                                    alt={deal.title}
                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => (e.currentTarget.src = "/images/categories/supplements.svg")}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow justify-between py-1">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-2">
                                        {deal.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <TrendingDown size={10} />
                                            {deal.discount}% OFF
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-medium bg-gray-200 px-1.5 py-0.5 rounded">
                                            {deal.stores?.[0]?.name || "Best Deal"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mt-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 line-through">₹{deal.original_price}</span>
                                        <span className="text-lg font-black text-gray-900">₹{deal.price}</span>
                                    </div>
                                    <a
                                        href={deal.stores?.[0]?.url || "#"}
                                        target="_blank"
                                        rel="nofollow noreferrer"
                                        className="bg-black hover:bg-[var(--primary)] text-white p-2 rounded-lg transition-colors shadow-lg shadow-black/10 group-hover:shadow-[var(--primary)]/20"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
