"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("gympro_admin_token");
        if (token) {
            router.push("/admin");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            localStorage.setItem("gympro_admin_token", data.token);
            router.push("/admin");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
            <div className="bg-[#111] p-8 rounded-3xl shadow-2xl border border-gray-800 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#e62e5c] p-4 rounded-2xl shadow-lg shadow-pink-500/20">
                        <Lock size={32} className="text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">Admin Gateway</h1>
                <p className="text-gray-400 text-center mb-8 font-medium">Secure Access Only</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center mb-6 font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#e62e5c] focus:ring-1 focus:ring-[#e62e5c] transition-all font-medium"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#e62e5c] focus:ring-1 focus:ring-[#e62e5c] transition-all font-medium"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#e62e5c] hover:bg-pink-600 text-white font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-pink-500/20 disabled:opacity-50 mt-4"
                    >
                        {loading ? "Authenticating..." : "LOGIN TO DASHBOARD"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <a href="/" className="text-gray-500 hover:text-white text-sm font-medium transition-colors">
                        &larr; Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
}
