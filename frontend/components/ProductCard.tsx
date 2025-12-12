"use client";

import React, { useState } from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';

interface ProductCardProps {
    title: string;
    price: number;
    original_price: number;
    discount_percentage?: number;
    image_url: string;
    product_url?: string;
    store_name?: string;
    // Shim for old props to prevent breakage until parent is updated
    stores?: any[];
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
    stores, // Fallback for old prop
}) => {
    // 1. STATE: Handle broken images automatically
    const [imgSrc, setImgSrc] = useState(image_url);
    const [imgError, setImgError] = useState(false);

    // Fallback Logic for props if parent component hasn't been updated yet
    const effectiveStoreName = store_name || (stores && stores.length > 0 ? stores[0].name : "Best Deal");
    // Logic to find url from stores array if product_url is missing
    const effectiveProductUrl = product_url || (stores && stores.length > 0 ? stores[0].url : "#");

    // Calculate discount if not provided
    const effectiveDiscount = discount_percentage !== undefined
        ? discount_percentage
        : (original_price && original_price > price
            ? Math.round(((original_price - price) / original_price) * 100)
            : 0);


    // 2. LOGIC: Sanitize the URL to prevent 404s
    // If the scraper gave us a relative link like "/product...", force it to be absolute.
    const getSafeUrl = (url: string) => {
        if (!url) return "#";
        if (url.startsWith("http")) return url;
        return `https://${url}`; // Force HTTPS if missing
    };

    const safeUrl = getSafeUrl(effectiveProductUrl);

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">

            {/* IMAGE SECTION */}
            <div className="relative h-48 w-full bg-white p-4 flex items-center justify-center">
                <img
                    src={imgError ? "https://placehold.co/400x400/f3f4f6/a3a3a3?text=No+Image" : `https://wsrv.nl/?url=${encodeURIComponent(imgSrc)}&w=400&h=400&fit=contain&output=webp`}
                    alt={title}
                    referrerPolicy="no-referrer" // <--- CRITICAL: Fixes Amazon/Flipkart blocking images
                    className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                        setImgError(true); // Switch to placeholder on error
                    }}
                />

                {/* Discount Badge */}
                {effectiveDiscount > 0 && (
                    <span className="absolute top-2 right-2 bg-[#ff3366] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        -{effectiveDiscount}%
                    </span>
                )}
            </div>

            {/* CONTENT SECTION */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Store Name Badge */}
                <div className="mb-2">
                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {effectiveStoreName}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 line-clamp-2 text-sm mb-auto" title={title}>
                    {title}
                </h3>

                {/* Price Block */}
                <div className="mt-4 mb-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#ff3366]">₹{price}</span>
                        {original_price > price && (
                            <span className="text-xs text-gray-400 line-through">₹{original_price}</span>
                        )}
                    </div>
                </div>

                {/* ACTION BUTTON (Must be an <a> tag for Cuelinks) */}
                <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow" // 'nofollow' is required for affiliate links
                    className="w-full flex items-center justify-center gap-2 bg-[#ff3366] hover:bg-[#e62e5c] text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                    <span>View Deal</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default ProductCard;
