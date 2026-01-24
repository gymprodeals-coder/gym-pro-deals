import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'About | GymPro Deals',
    description: 'About GymPro Deals and its mission to help fitness enthusiasts.',
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-black mb-8 border-b-4 border-[var(--primary)] inline-block pb-2">About GymPro</h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            GymProDeals is an independent project built and maintained by Vengateshwaran to help fitness enthusiasts find the best supplement deals across trusted platforms.
                        </p>
                        <p>
                            We believe that staying fit shouldn't break the bank. By aggregating prices from major retailers like Amazon, Flipkart, and HealthKart, we ensure you always get the best price on your whey protein, creatine, and other essentials.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
