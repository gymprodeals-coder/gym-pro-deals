import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Compare Supplement Prices | GymPro Deals',
    description: 'Compare prices across Amazon, Flipkart, and HealthKart for the best supplement deals.',
};

export default function ComparePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl font-black mb-6">Compare & Save</h1>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-12">
                        <h2 className="text-2xl font-bold mb-4">How We Compare Prices</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            GymProDeals automatically tracks prices from India's top supplement stores including Amazon, Flipkart, and HealthKart. We show you the lowest price available so you never overpay.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="p-4">
                                <div className="text-4xl mb-2">🔍</div>
                                <h3 className="font-bold text-lg">We Track</h3>
                                <p className="text-sm text-gray-500">Real-time price monitoring</p>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl mb-2">⚖️</div>
                                <h3 className="font-bold text-lg">You Compare</h3>
                                <p className="text-sm text-gray-500">See prices side-by-side</p>
                            </div>
                            <div className="p-4">
                                <div className="text-4xl mb-2">💰</div>
                                <h3 className="font-bold text-lg">You Save</h3>
                                <p className="text-sm text-gray-500">Get the best deal instantly</p>
                            </div>
                        </div>

                        <Link
                            href="/"
                            className="inline-block bg-[var(--primary)] hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:scale-105"
                        >
                            Start Comparing Deals
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
