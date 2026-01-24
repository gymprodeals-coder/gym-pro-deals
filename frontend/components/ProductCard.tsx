"use client";

import React, { useState, useMemo } from 'react';
import { ShoppingCart, ExternalLink, AlertCircle } from 'lucide-react';

interface ProductCardProps {
    title: string;
    price: number;
    original_price: number;
    discount_percentage?: number;
    image_url: string;
    product_url?: string; // Optional because we might need to fallback
    store_name?: string;
    // Shim for old props
    stores?: Array<{ name: string; url: string; price: number }>;
    id?: string;
    brand?: string;
    rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    original_price,
    discount_percentage,
    image_url,
    product_url,
    store_name,
    stores,
}) => {
    // 1. ROBUST DATA RESOLUTION
    // Resolve Store Name
    const effectiveStoreName = useMemo(() => {
        if (store_name) return store_name;
        if (stores && stores.length > 0 && stores[0].name) return stores[0].name;
        return "Best Deal";
    }, [store_name, stores]);

    // Resolve Product URL
    const rawProductUrl = useMemo(() => {
        if (product_url) return product_url;
        if (stores && stores.length > 0 && stores[0].url) return stores[0].url;
        return "";
    }, [product_url, stores]);

    // 2. IMAGE HANDLING STATE
    const [imgSrc, setImgSrc] = useState<string>(image_url);
    const [hasError, setHasError] = useState(false);
    const [useProxy, setUseProxy] = useState(true); // default to proxy for resizing

    // 3. SAFE URL GENERATION
    const { finalUrl, isFallback } = useMemo(() => {
        const cleanTitle = encodeURIComponent(title || "");

        // Helper: Generate search fallback
        const getSearchUrl = (store: string) => {
            const s = store.toLowerCase();
            if (s.includes("amazon")) return `https://www.amazon.in/s?k=${cleanTitle}`;
            if (s.includes("flipkart")) return `https://www.flipkart.com/search?q=${cleanTitle}`;
            if (s.includes("healthkart")) return `https://www.healthkart.com/search?q=${cleanTitle}`;
            return `https://www.google.com/search?q=${cleanTitle} buy online`;
        };

        // Validate Raw URL
        if (!rawProductUrl || rawProductUrl.length < 5 || rawProductUrl === "#") {
            return { finalUrl: getSearchUrl(effectiveStoreName), isFallback: true };
        }

        let url = rawProductUrl.trim();
        // Fix missing protocol
        if (!url.startsWith("http")) {
            url = `https://${url}`;
        }

        // Basic validation regex
        try {
            new URL(url); // Will throw if invalid
            return { finalUrl: url, isFallback: false };
        } catch (e) {
            return { finalUrl: getSearchUrl(effectiveStoreName), isFallback: true };
        }
    }, [rawProductUrl, title, effectiveStoreName]);

    // 4. DISCOUNT CALCULATION
    const effectiveDiscount = useMemo(() => {
        if (discount_percentage !== undefined) return discount_percentage;
        if (original_price && price && original_price > price) {
            return Math.round(((original_price - price) / original_price) * 100);
        }
        return 0;
    }, [discount_percentage, original_price, price]);


    // 5. IMAGE SRC LOGIC
    const finalImageSrc = useMemo(() => {
        if (hasError || !image_url) return "https://placehold.co/400x400/f3f4f6/a3a3a3?text=No+Image";

        // Use wsrv.nl proxy for resizing and reliable delivery (bypasses some hotlink blocks)
        if (useProxy) {
            return `https://wsrv.nl/?url=${encodeURIComponent(image_url)}&w=400&h=400&fit=contain&output=webp&il`;
        }

        // Fallback to direct URL (with no-referrer policy)
        return image_url;
    }, [image_url, hasError, useProxy]);


    const handleImageError = () => {
        if (useProxy) {
            // If proxy failed, try direct image
            setUseProxy(false);
        } else {
            // If direct failed, show placeholder
            setHasError(true);
        }
    };

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">

            {/* IMAGE SECTION */}
            <div className="relative h-48 w-full bg-white p-4 flex items-center justify-center overflow-hidden">
                <img
                    src={finalImageSrc}
                    alt={title || "Product Image"}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={`object-contain h-full w-full transition-transform duration-500 group-hover:scale-105 ${hasError ? 'opacity-50 grayscale' : ''}`}
                    onError={handleImageError}
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
                    {/* Fallback Indicator (Subtle) */}
                    {isFallback && (
                        <span title="Direct link unavailable, searching store instead" className="text-amber-500 cursor-help">
                            <AlertCircle size={12} />
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

                {/* ACTION BUTTON */}
                <a
                    href={finalUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`w-full flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-lg transition-colors text-sm ${isFallback
                            ? "bg-amber-500 hover:bg-amber-600 text-white" // Different color for search fallback if desired, or keep same. Keeping uniform usually better.
                            : "bg-[#ff3366] hover:bg-[#e62e5c] text-white"
                        }`}
                    onClick={(e) => {
                        if (!finalUrl || finalUrl === "#") {
                            e.preventDefault();
                            alert("Sorry, this deal is currently unavailable.");
                        }
                    }}
                >
                    <span>{isFallback ? "Find Deal" : "View Deal"}</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
