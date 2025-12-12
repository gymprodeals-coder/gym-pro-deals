"use client";

import { Dumbbell, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Prevent hydration mismatch by ensuring content is only rendered when client-side logic is active if needed
    useEffect(() => {
        setIsClient(true);
    }, []);


    // Updated navigation to point to sections
    const NAV_LINKS = [
        { name: "Home", href: "/" },
        { name: "Deals", href: "/#featured-deals" },
        { name: "Compare", href: "/#categories" },
        { name: "About", href: "/#newsletter" }, // Reuse newsletter for now
        { name: "Contact", href: "/#newsletter" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-900">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-[var(--primary)] p-2 rounded-lg shadow-lg shadow-pink-500/20 group-hover:rotate-12 transition-transform duration-300">
                            <Dumbbell className="text-white" size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">
                            GymPro <span className="text-[var(--primary)]">Deal</span>
                        </span>
                    </Link>

                    {/* Desktop Nav - Centered */}
                    <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions - Right Side */}
                    <div className="flex items-center gap-6">
                        <button className="text-gray-300 hover:text-white transition-colors relative group">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1.5 -right-1.5 bg-[var(--primary)] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                                0
                            </span>
                        </button>

                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="hidden md:flex items-center gap-2 border border-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] text-white px-5 py-2 rounded-full text-sm font-bold transition-all"
                        >
                            <User size={18} />
                            Login
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-gray-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-[#0a0a0a] border-t border-gray-900 p-6 absolute w-full left-0 h-screen z-40">
                        <nav className="flex flex-col gap-6 text-lg">
                            {NAV_LINKS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-[var(--primary)] font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                                className="mt-4 flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-bold"
                            >
                                Login
                            </button>
                        </nav>
                    </div>
                )}
            </header>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}
