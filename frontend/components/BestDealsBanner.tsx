"use client";

import { useMemo } from "react";
import { ExternalLink, Star } from "lucide-react";
import { Product } from "@/lib/api";

export default function BestDealsBanner({ products }: { products: Product[] }) {

    const topDeals = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.slice(0, 3);
    }, [products]);

    if (topDeals.length === 0) return null;

    return (
        <section className="container mx-auto px-4 mt-[-4rem] relative z-20 mb-16">
            <div className="bg-[#111] rounded-3xl shadow-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#e62e5c] p-2 rounded-lg text-white animate-pulse">
                        <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                            Featured Supplements
                        </h2>
                        <p className="text-sm text-gray-400 font-medium">Top picks from our collection</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topDeals.map((deal) => (
                        <div key={deal.id} className="flex gap-4 p-4 rounded-2xl bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-gray-800 hover:border-[#e62e5c] transition-all hover:shadow-[0_0_15px_rgba(230,46,92,0.2)] group">
                            {/* Image */}
                            <div className="w-24 h-24 bg-[#111] rounded-xl p-2 flex items-center justify-center shrink-0 border border-gray-800">
                                <img
                                    src={deal.image || "/images/categories/supplements.svg"}
                                    alt={deal.name}
                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow justify-between py-1">
                                <div>
                                    <h3 className="font-bold text-gray-200 text-sm line-clamp-2 leading-tight mb-2">
                                        {deal.name}
                                    </h3>
                                    <span className="text-[10px] text-gray-400 font-medium bg-gray-800 px-1.5 py-0.5 rounded uppercase">
                                        {deal.category}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between mt-2">
                                    <span className="text-xs text-gray-500">{deal.lastUpdated}</span>
                                    {deal.amazonLink && (
                                        <a
                                            href={deal.amazonLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#e62e5c] hover:bg-pink-600 text-white px-3 py-2 rounded-lg transition-colors shadow-lg flex items-center gap-2 text-xs font-bold"
                                        >
                                            <span>Amazon</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
