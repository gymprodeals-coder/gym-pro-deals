
import { Dumbbell, Activity, Battery, Zap, Pill, Milk, Layers } from 'lucide-react';

export interface CategoryConfig {
    name: string;
    id: string;
    description: string;
    icon: any; // Lucide icon type or string key if we map it later
}

export interface ThemeConfig {
    primary: string;
    secondary?: string;
    accent?: string;
    background: string;
    surface?: string; // For cards or alternate backgrounds
    textPrimary: string;
    textMuted: string;
}

export interface SiteConfig {
    name: string;
    domain: string;
    description: string;
    keywords: string[];
    theme: ThemeConfig;
    logo: {
        text: string;
        highlight: string;
        icon: any; // Lucide icon
    };
    hero: {
        title: {
            first: string;
            highlight: string;
        };
        subtitle: string;
        searchPlaceholder: string;
    };
    categories: CategoryConfig[];
    contact: {
        email: string;
    };
    stores: string[];
}

export const gymProDealsConfig: SiteConfig = {
    name: "GymPro Deals",
    domain: "https://gymprodeals.in",
    description: "Compare prices for Whey Protein, Creatine, and Gym Gear from Amazon, Flipkart & HealthKart. Track price drops and save money on your gains.",
    keywords: ["gym deals", "whey protein price", "creatine price", "supplement offers", "gym gear india", "price tracker"],
    theme: {
        primary: "#ff3366",
        secondary: "#FFD6E0", // Placeholder/unused in gympro currently but needed for interface
        background: "#0a0a0a",
        textPrimary: "#ffffff",
        textMuted: "#9ca3af", // tailwind gray-400 roughly
    },
    logo: {
        text: "GymPro",
        highlight: "Deals",
        icon: Dumbbell,
    },
    hero: {
        title: {
            first: "Find Your Best",
            highlight: "Supplement Deals",
        },
        subtitle: "We track prices across Amazon, Flipkart, & HealthKart so you never overpay for your gains.",
        searchPlaceholder: "Search for 'Whey Protein'...",
    },
    categories: [
        { name: "Whey Protein", icon: Milk, description: "Build muscle with top whey brands", id: "Whey Protein" },
        { name: "Creatine", icon: Activity, description: "Boost strength and performance", id: "Creatine" },
        { name: "Pre-Workout", icon: Zap, description: "Energy for intense workouts", id: "Pre-Workout" },
        { name: "BCAA", icon: Layers, description: "Recover faster and reduce fatigue", id: "BCAA" },
        { name: "Vitamins", icon: Pill, description: "Essential nutrients for health", id: "Vitamins" },
        { name: "Mass Gainer", icon: Dumbbell, description: "Bulk up with high-calorie gainers", id: "Mass Gainer" },
        { name: "Supplements", icon: Pill, description: "General health and fitness supplements", id: "Supplements" },
    ],
    contact: {
        email: "vengateshwaranpalaniyappa@gmail.com",
    },
    stores: ["Amazon", "Flipkart", "HealthKart"],
};

import { beautyConfig } from './beauty';



export function getSiteConfig(): SiteConfig {
    return process.env.NEXT_PUBLIC_SITE_KEY === 'beauty' ? beautyConfig : gymProDealsConfig;
}

