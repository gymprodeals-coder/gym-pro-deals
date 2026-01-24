import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Privacy Policy | GymPro Deals',
    description: 'How GymPro Deals collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 text-gray-900 pt-10 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-black mb-8 border-b-4 border-[var(--primary)] inline-block pb-2">Privacy Policy</h1>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <section>
                            <p>
                                At GymPro Deals, we respect your privacy and are committed to protecting your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Non-personal data such as browser type, device type, and pages visited</li>
                                <li>Cookies for analytics and performance optimization</li>
                                <li>Affiliate tracking information via third-party services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">How We Use Information</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>To improve user experience</li>
                                <li>To analyze website traffic</li>
                                <li>To optimize deal recommendations</li>
                                <li>To track affiliate conversions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
                            <p>
                                We may use third-party services such as analytics tools and affiliate networks (including Cuelinks) that may collect user data in accordance with their own privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-3">Cookies</h2>
                            <p>
                                GymPro Deals uses cookies to improve performance and user experience. By using this website, you consent to our use of cookies.
                            </p>
                        </section>

                        <section>
                            <p className="italic mt-6">
                                If you have any questions regarding this policy, you may contact us via the contact page.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
