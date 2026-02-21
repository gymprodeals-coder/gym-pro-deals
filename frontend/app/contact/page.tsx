"use client";

import Link from "next/link";
import { Mail, ArrowLeft, Send } from "lucide-react";

import Footer from "@/components/Footer";

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
                                <h3 className="text-xl font-bold mb-2">Email Support & Business Inquiries</h3>
                                <p className="text-gray-400 mb-6">
                                    For all general inquiries, partnerships, or business matters, please email us directly. We aim to respond within 24 hours.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-400 font-medium">
                                        Official Publisher Email:
                                    </p>
                                    <a
                                        href="mailto:vengateshwaranpalaniyappa@gmail.com"
                                        className="text-white font-bold text-lg hover:text-[var(--primary)] transition-colors inline-block"
                                    >
                                        vengateshwaranpalaniyappa@gmail.com
                                    </a>
                                </div>
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
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4">
                                <div className="bg-white/5 p-4 rounded-full">
                                    <Send size={32} className="text-gray-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">Contact Form Coming Soon</h4>
                                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                        We are currently upgrading our support system.
                                        Please use the email address on the left for all inquiries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
