"use client";

import { useState } from "react";
import { X, Mail, Lock, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1a1a1a] border border-gray-800 rounded-3xl p-8 z-[70] shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-[var(--primary)] p-3 rounded-xl mb-4">
                                <Dumbbell className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {isLogin ? "Welcome Back" : "Join GymPro Deal"}
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 text-center">
                                {isLogin
                                    ? "Login to access your saved deals and alerts."
                                    : "Sign up to track prices and get the best offers."}
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-[var(--primary)] hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-pink-500/20 mt-4 h-12">
                                {isLogin ? "Log In" : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[var(--primary)] hover:underline font-semibold"
                                >
                                    {isLogin ? "Sign Up" : "Log In"}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
