"use client";

import React from 'react';
import type { Product } from '@/lib/api';

const ProductCard: React.FC<Product> = ({
    id,
    name,
    image,
    description,
    amazonLink,
    flipkartLink,
    healthkartLink,
    category,
    lastUpdated,
}) => {
    return (
        <div className="group bg-[#111] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-800 flex flex-col h-full relative">

            {/* IMAGE SECTION */}
            <div className="relative h-56 w-full bg-[#0a0a0a] p-4 flex items-center justify-center overflow-hidden">
                <img
                    src={image || "/images/categories/supplements.svg"}
                    alt={name}
                    loading="lazy"
                    className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 drop-shadow-lg"
                />
                {category && (
                    <span className="absolute top-3 left-3 bg-[#e62e5c] text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-sm z-10">
                        {category}
                    </span>
                )}
            </div>

            {/* CONTENT SECTION */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-bold text-white leading-snug line-clamp-2 text-lg mb-2" title={name}>
                    {name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {description}
                </p>

                {/* ACTION BUTTONS (Stores) */}
                <div className="mt-auto grid gap-2">
                    {amazonLink && (
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/redirect?url=${encodeURIComponent(amazonLink)}&productId=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-gray-800 hover:bg-[#ff9900] text-gray-200 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm border border-gray-700 hover:border-transparent"
                        >
                            Amazon
                        </a>
                    )}
                    {flipkartLink && (
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/redirect?url=${encodeURIComponent(flipkartLink)}&productId=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-gray-800 hover:bg-[#2874f0] text-gray-200 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm border border-gray-700 hover:border-transparent"
                        >
                            Flipkart
                        </a>
                    )}
                    {healthkartLink && (
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/redirect?url=${encodeURIComponent(healthkartLink)}&productId=${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-gray-800 hover:bg-[#00c6bc] text-gray-200 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm border border-gray-700 hover:border-transparent"
                        >
                            HealthKart
                        </a>
                    )}
                </div>

                {/* Last Updated */}
                <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                        Price Last Updated: {lastUpdated}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
