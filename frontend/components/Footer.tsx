export default function Footer() {
    return (
        <footer className="bg-[#111111] text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">GymPro Deal</h3>
                    <p className="text-sm">
                        The smartest way to find the best deals on supplements across India's top stores.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[var(--primary)]">Top Deals</a></li>
                        <li><a href="#" className="hover:text-[var(--primary)]">Compare</a></li>
                        <li><a href="#" className="hover:text-[var(--primary)]">categories</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[var(--primary)]">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-[var(--primary)]">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-[var(--primary)]">Affiliate Disclaimer</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Stay Connected</h4>
                    <div className="flex gap-4">
                        {/* Social icons placeholders */}
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors"></div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors"></div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-[var(--primary)] transition-colors"></div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                © {new Date().getFullYear()} GymPro Deal. All rights reserved.
            </div>
        </footer>
    );
}
