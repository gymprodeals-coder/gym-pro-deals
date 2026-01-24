"use client";

import React, { useMemo } from 'react';
import { ExternalLink, Search } from 'lucide-react';

interface ProductCardProps {
    title: string;
    price: number;
    original_price: number;
    discount_percentage?: number;
    image_url: string; // Kept for interface compatibility, but unused for display
    product_url?: string;
    store_name?: string;
    stores?: Array<{ name: string; url: string; price: number }>;
    id?: string;
    brand?: string;
    rating?: number;
    category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    original_price,
    discount_percentage,
    store_name,
    stores,
    category,
}) => {
    // 1. RESOLVE STORE NAME
    const effectiveStoreName = useMemo(() => {
        if (store_name) return store_name;
        if (stores && stores.length > 0 && stores[0].name) return stores[0].name;
        return "Best Deal";
    }, [store_name, stores]);

    // 2. IMAGE STRATEGY (LOCAL ONLY)
    const localImageSrc = useMemo(() => {
        const cat = (category || "").toLowerCase();
        if (cat.includes("whey")) return "/images/categories/whey-protein.svg";
        if (cat.includes("creatine")) return "/images/categories/creatine.svg";
        if (cat.includes("pre")) return "/images/categories/pre-workout.svg";
        if (cat.includes("bcaa")) return "/images/categories/bcaa.svg";
        if (cat.includes("vitamin")) return "/images/categories/vitamins.svg";
        if (cat.includes("gainer")) return "/images/categories/mass-gainer.svg";
        return "/images/categories/supplements.svg";
    }, [category]);

    // 3. DISCOUNT LOGIC
    const effectiveDiscount = useMemo(() => {
        if (discount_percentage !== undefined) return discount_percentage;
        if (original_price && price && original_price > price) {
            return Math.round(((original_price - price) / original_price) * 100);
        }
        return 0;
    }, [discount_percentage, original_price, price]);

    // 4. LINK STRATEGY (SEARCH FALLBACK ONLY)
    const searchUrl = useMemo(() => {
        const cleanTitle = encodeURIComponent(title || "");
        const s = effectiveStoreName.toLowerCase();

        if (s.includes("amazon")) return `https://www.amazon.in/s?k=${cleanTitle}`;
        if (s.includes("flipkart")) return `https://www.flipkart.com/search?q=${cleanTitle}`;
        if (s.includes("healthkart")) return `https://www.healthkart.com/search?q=${cleanTitle}`;

        return `https://www.google.com/search?q=${cleanTitle} buy online`;
    }, [title, effectiveStoreName]);

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">

            {/* IMAGE SECTION */}
            <div className="relative h-48 w-full bg-white p-6 flex items-center justify-center overflow-hidden">
                <img
                    src={localImageSrc}
                    alt={category || "Product Category"}
                    loading="lazy"
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />

                {/* Discount Badge */}
                {effectiveDiscount > 0 && (
                    <span className="absolute top-2 right-2 bg-[#ff3366] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
                        -{effectiveDiscount}%
                    </span>
                )}
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Store Name Badge */}
                <div className="mb-2 flex items-center justify-between">
                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {effectiveStoreName}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 line-clamp-2 text-sm mb-auto" title={title || "Product"}>
                    {title || "Untitled Product"}
                </h3>

                {/* Price Block */}
                <div className="mt-4 mb-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#ff3366]">₹{price || 0}</span>
                        {(original_price || 0) > (price || 0) && (
                            <span className="text-xs text-gray-400 line-through">₹{original_price}</span>
                        )}
                    </div>
                </div>

                {/* ACTION BUTTON */}
                <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-full flex items-center justify-center gap-2 bg-[#ff3366] hover:bg-[#e62e5c] text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                    <span>Find on {effectiveStoreName}</span>
                    <Search size={14} strokeWidth={3} />
                </a>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
