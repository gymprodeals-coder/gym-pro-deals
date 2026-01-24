import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">GymPro Deals</h3>
                    <p className="text-sm">
                        The smartest way to find the best deals on supplements across India's top stores.
                    </p>
                    <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
                        <p className="text-xs text-gray-400 italic">
                            GymPro Deals uses affiliate links. We may earn a commission at no extra cost to users.
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-[var(--primary)] transition-colors">Top Deals</Link></li>
                        <li><Link href="/compare" className="hover:text-[var(--primary)] transition-colors">Compare</Link></li>
                        <li><Link href="/categories" className="hover:text-[var(--primary)] transition-colors">Categories</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/privacy-policy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
                        <li><Link href="/affiliate-disclaimer" className="hover:text-[var(--primary)] transition-colors">Affiliate Disclaimer</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Stay Connected</h4>
                    <div className="flex gap-4">
                        {/* Social icons placeholders */}
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors cursor-pointer"></div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                <p>© {new Date().getFullYear()} GymPro Deals. All rights reserved.</p>
                <p className="mt-2 text-gray-600">Built & maintained by <span className="text-gray-500 hover:text-gray-400 transition-colors">Vengateshwaran</span></p>
            </div>
        </footer>
    );
}
