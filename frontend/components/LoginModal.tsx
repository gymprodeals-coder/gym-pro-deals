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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Reset state when modal opens/closes or mode changes
    const resetState = () => {
        setEmail("");
        setPassword("");
        setError(null);
        setLoading(false);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            // Dynamically import firebase to avoid SSR issues if used elsewhere, 
            // though standard import is fine if firebase.ts is client-safe.
            // Using standard import for cleaner code as per typical Next.js client usage.
            const { auth } = await import("@/lib/firebase");
            const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import("firebase/auth");

            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                // Success - close modal
                handleClose();
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                // Success - close modal (or show welcome message)
                handleClose();
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            let msg = "An error occurred. Please try again.";
            if (err.code === "auth/invalid-email") msg = "Invalid email address.";
            if (err.code === "auth/user-disabled") msg = "This account has been disabled.";
            if (err.code === "auth/user-not-found") msg = "No account found with this email.";
            if (err.code === "auth/wrong-password") msg = "Incorrect password.";
            if (err.code === "auth/email-already-in-use") msg = "Email already in use.";
            if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
            if (err.code === "auth/invalid-credential") msg = "Invalid credentials.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
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
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-[var(--primary)] p-3 rounded-xl mb-4">
                                <Dumbbell className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {isLogin ? "Welcome Back" : "Join GymPro Deals"}
                            </h2>
                            <p className="text-gray-400 text-sm mt-2 text-center">
                                {isLogin
                                    ? "Login to access your saved deals and alerts."
                                    : "Sign up to track prices and get the best offers."}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[var(--primary)] hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-pink-500/20 mt-4 h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    isLogin ? "Log In" : "Create Account"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button
                                    onClick={toggleMode}
                                    disabled={loading}
                                    className="text-[var(--primary)] hover:underline font-semibold disabled:opacity-50"
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
