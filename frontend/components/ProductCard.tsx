"use client";

import { getCategoryImage } from '@/lib/images';
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
    const [isCompareOpen, setIsCompareOpen] = React.useState(false);

    // 1. RESOLVE STORE NAME & LIST
    const effectiveStoreName = useMemo(() => {
        if (store_name) return store_name;
        if (stores && stores.length > 0 && stores[0].name) return stores[0].name;
        return "Best Deal";
    }, [store_name, stores]);

    const availableStores = useMemo(() => {
        return stores && stores.length > 0 ? stores : [{ name: effectiveStoreName, price: price, url: "" }];
    }, [stores, effectiveStoreName, price]);

    const hasMultipleStores = availableStores.length > 1;

    // 2. IMAGE STRATEGY (LOCAL ONLY)
    const [hasError, setHasError] = React.useState(false);
    const localImageSrc = useMemo(() => {
        return getCategoryImage(category);
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
    const getSearchUrl = (sName: string) => {
        const cleanTitle = encodeURIComponent(title || "");
        const s = sName.toLowerCase();
        if (s.includes("amazon")) return `https://www.amazon.in/s?k=${cleanTitle}`;
        if (s.includes("flipkart")) return `https://www.flipkart.com/search?q=${cleanTitle}`;
        if (s.includes("healthkart")) return `https://www.healthkart.com/search?q=${cleanTitle}`;
        return `https://www.google.com/search?q=${cleanTitle} buy online`;
    };

    const mainUrl = getSearchUrl(effectiveStoreName);

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative">

            {/* IMAGE SECTION */}
            <div className="relative h-48 w-full bg-white p-6 flex items-center justify-center overflow-hidden">
                <img
                    src={hasError ? "/images/categories/supplements.svg" : localImageSrc}
                    alt={category || "Product Category"}
                    loading="lazy"
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    onError={() => setHasError(true)}
                />

                {/* Discount Badge */}
                {effectiveDiscount > 0 && (
                    <span className="absolute top-2 right-2 bg-[#ff3366] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
                        -{effectiveDiscount}%
                    </span>
                )}
            </div>

            {/* CONTENT SECTION */}
            <div className={`p-4 flex flex-col flex-grow bg-white ${isCompareOpen ? 'hidden' : 'flex'}`}>
                {/* Store Name Badge */}
                <div className="mb-2 flex items-center justify-between">
                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {effectiveStoreName}
                    </span>
                    {hasMultipleStores && (
                        <span className="text-[10px] text-[var(--primary)] font-medium bg-pink-50 px-2 py-1 rounded">
                            +{availableStores.length - 1} more
                        </span>
                    )}
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

                {/* ACTION BUTTONS */}
                <div className="grid gap-2">
                    <a
                        href={mainUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="w-full flex items-center justify-center gap-2 bg-[#ff3366] hover:bg-[#e62e5c] text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                        <span>Find on {effectiveStoreName}</span>
                        <Search size={14} strokeWidth={3} />
                    </a>

                    {hasMultipleStores && (
                        <button
                            onClick={() => setIsCompareOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Compare Prices
                        </button>
                    )}
                </div>
            </div>

            {/* COMPARISON OVERLAY */}
            {isCompareOpen && (
                <div className="absolute inset-0 bg-white z-20 flex flex-col p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h4 className="font-bold text-gray-900 text-sm">Compare Prices</h4>
                        <button
                            onClick={() => setIsCompareOpen(false)}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            Close
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-2 no-scrollbar">
                        {availableStores.map((store, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                                <div>
                                    <p className="font-bold text-xs text-gray-800 uppercase">{store.name}</p>
                                    <p className="text-sm font-black text-[#ff3366]">₹{store.price}</p>
                                </div>
                                <a
                                    href={getSearchUrl(store.name)}
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="bg-black text-white text-xs font-bold px-3 py-2 rounded hover:bg-gray-800"
                                >
                                    Find on {store.name}
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsCompareOpen(false)}
                        className="mt-2 text-xs text-center text-gray-400 hover:text-gray-600 block w-full"
                    >
                        Back to details
                    </button>
                </div>
            )}
        </div>
    );
};

export default React.memo(ProductCard);
