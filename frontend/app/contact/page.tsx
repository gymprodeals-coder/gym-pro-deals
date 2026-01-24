"use client";

import Link from "next/link";
import { Mail, ArrowLeft, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[var(--primary)] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">

                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Deals
                </Link>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Get in <span className="text-[var(--primary)]">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-16 max-w-2xl">
                        Have a question about a deal? Found a bug? Or just want to say hi?
                        We'd love to hear from you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-[var(--primary)]/50 transition-colors">
                                <div className="bg-[var(--primary)]/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                    <Mail className="text-[var(--primary)]" size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                                <p className="text-gray-400 mb-4">
                                    For all inquiries, please email us directly. We aim to respond within 24 hours.
                                </p>
                                <a
                                    href="mailto:support@gymprodeals.in"
                                    className="text-white font-bold text-lg hover:text-[var(--primary)] transition-colors"
                                >
                                    support@gymprodeals.in
                                </a>
                            </div>

                            <div className="p-8 rounded-3xl border border-white/5 bg-black/50">
                                <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    <details className="group">
                                        <summary className="list-none flex justify-between items-center cursor-pointer text-gray-400 hover:text-white">
                                            <span>How often are deals updated?</span>
                                            <span className="group-open:rotate-180 transition-transform">↓</span>
                                        </summary>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                            We update our deals daily using automated trackers across major e-commerce sites.
                                        </p>
                                    </details>
                                    <div className="h-px bg-white/10" />
                                    <details className="group">
                                        <summary className="list-none flex justify-between items-center cursor-pointer text-gray-400 hover:text-white">
                                            <span>Do you sell products directly?</span>
                                            <span className="group-open:rotate-180 transition-transform">↓</span>
                                        </summary>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                            No, we are an aggregator. We find the best prices and redirect you to trusted stores like Amazon or Flipkart.
                                        </p>
                                    </details>
                                </div>
                            </div>
                        </div>

                        {/* Visual / Form Stub */}
                        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input type="text" placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea rows={4} placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" />
                                </div>
                                <button className="w-full bg-[var(--primary)] hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-[var(--primary)]/20 flex items-center justify-center gap-2">
                                    Send Message <Send size={18} />
                                </button>
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    This form is currently in demo mode. Please use email for urgent inquiries.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
