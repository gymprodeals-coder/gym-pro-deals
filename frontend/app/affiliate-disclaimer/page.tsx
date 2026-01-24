import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Affiliate Disclaimer | GymPro Deals',
    description: 'Transparency about our affiliate relationships and how GymPro Deals generates revenue.',
};

export default function AffiliateDisclaimerPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-black mb-8 border-b-4 border-[var(--primary)] inline-block pb-2">Affiliate Disclaimer</h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold mb-3">Affiliate Participation</h2>
                            <p>
                                GymProDeals participates in affiliate marketing programs. This means that when users click on product links and make a purchase, GymProDeals may earn a small commission at no additional cost to the user.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                            <p>
                                Our goal is to provide genuine deals, price comparisons, and helpful information to help users make better purchasing decisions. Affiliate commissions help support the maintenance and development of this platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">No Guarantee</h2>
                            <p>
                                We do not guarantee product availability, pricing accuracy, or merchant services. All purchases are made directly through third-party platforms such as Amazon, Flipkart, and other partner websites.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
