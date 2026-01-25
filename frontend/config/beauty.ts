
import { Sparkles, Heart, Sun, Droplets, Smile, Star, Palette } from 'lucide-react';
import { SiteConfig } from './site';

export const beautyConfig: SiteConfig = {
    name: "Glow & Save",
    domain: "https://glowandsave.in",
    description: "Find the best deals on skincare, makeup, and beauty products from Amazon, Nykaa, & Myntra.",
    keywords: ["skincare deals", "makeup discounts", "beauty price tracker", "nykaa sale", "amazon beauty"],
    themeColor: "#ec4899", // Pink/Rose
    logo: {
        text: "Glow &",
        highlight: "Save",
        icon: Sparkles,
    },
    hero: {
        title: {
            first: "Uncover Your Best",
            highlight: "Beauty Steals",
        },
        subtitle: "Track prices across Amazon, Nykaa, & Myntra to save on your glow-up routine.",
        searchPlaceholder: "Search for 'Vitamin C Serum'...",
    },
    categories: [
        { name: "Skincare", icon: Droplets, description: "Serums, moisturizers, and cleansers", id: "Skincare" },
        { name: "Makeup", icon: Palette, description: "Foundations, lipsticks, and more", id: "Makeup" },
        { name: "Hair Care", icon: Star, description: "Shampoos, oils, and treatments", id: "Hair Care" },
        { name: "Sunscreens", icon: Sun, description: "Protect your skin from UV rays", id: "Sunscreens" },
        { name: "Fragrance", icon: Heart, description: "Perfumes and body mists", id: "Fragrance" },
        { name: "Body Care", icon: Smile, description: "Lotions, scrubs, and washes", id: "Body Care" },
        { name: "K-Beauty", icon: Sparkles, description: "Korean innovations for glass skin", id: "K-Beauty" },
    ],
    contact: {
        email: "glowandsave@gmail.com",
    },
    stores: ["Amazon", "Nykaa", "Myntra"],
};
