import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Terms of Service | GymPro Deals',
    description: 'Rules and regulations for using the GymPro Deals website.',
};

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-black mb-8 border-b-4 border-[var(--primary)] inline-block pb-2">Terms of Service</h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <section>
                            <p>
                                By accessing and using GymProDeals, you agree to the following terms:
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Use of Website</h2>
                            <p>
                                GymProDeals provides information on fitness supplements, deals, and price comparisons for informational purposes only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Affiliate Links</h2>
                            <p>
                                GymProDeals may contain affiliate links. We may earn a commission when users purchase products through these links.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">External Websites</h2>
                            <p>
                                We do not control third-party websites. We are not responsible for their content, pricing, policies, or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Accuracy of Information</h2>
                            <p>
                                We do not guarantee the accuracy, completeness, or reliability of any product information or pricing displayed on the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
                            <p>
                                GymProDeals shall not be held liable for any loss, damage, or inconvenience arising from the use of this website or third-party services.
                            </p>
                        </section>

                        <section>
                            <p className="font-medium mt-6">
                                By continuing to use this website, you agree to these terms.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
