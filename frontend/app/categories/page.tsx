import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Dumbbell, Activity, Battery, Zap, Pill, Milk, Layers } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Categories | GymPro Deals',
    description: 'Browse all supplement categories - Whey Protein, Creatine, Pre-Workout, and more.',
};

const CATEGORIES = [
    { name: "Whey Protein", icon: Milk, desc: "Build muscle with top whey brands", id: "Whey Protein" },
    { name: "Creatine", icon: Activity, desc: "Boost strength and performance", id: "Creatine" },
    { name: "Pre-Workout", icon: Zap, desc: "Energy for intense workouts", id: "Pre-Workout" },
    { name: "BCAA", icon: Layers, desc: "Recover faster and reduce fatigue", id: "BCAA" },
    { name: "Vitamins", icon: Pill, desc: "Essential nutrients for health", id: "Vitamins" },
    { name: "Mass Gainer", icon: Dumbbell, desc: "Bulk up with high-calorie gainers", id: "Mass Gainer" },
    { name: "Supplements", icon: Pill, desc: "General health and fitness supplements", id: "Supplements" },
];

export default function CategoriesPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-black mb-8 text-center">Browse Categories</h1>
                    <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
                        Find the best deals on the specific supplements you need to reach your fitness goals.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                href={`/#cat-${cat.id}`}
                                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-[var(--primary)] transition-all flex flex-col items-center text-center"
                            >
                                <div className="bg-gray-100 p-4 rounded-full mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                    <cat.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{cat.name}</h2>
                                <p className="text-gray-500">{cat.desc}</p>
                                <span className="mt-6 text-[var(--primary)] font-bold text-sm bg-pink-50 px-4 py-2 rounded-full group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                                    View Deals
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
