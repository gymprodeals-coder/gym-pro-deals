"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("adminToken");

        // Allow access to login without token
        if (pathname === "/admin/login") {
            setLoading(false);
            return;
        }

        if (!token) {
            router.push("/admin/login");
        } else {
            setLoading(false);
        }
    }, [pathname, router]);

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-warning" role="status"></div></div>;
    }

    return (
        <div>
            {pathname !== "/admin/login" && (
                <div className="bg-dark p-3 text-white border-bottom border-secondary mb-4 flex justify-between align-items-center">
                    <h2 className="m-0 text-warning">Admin Dashboard</h2>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                            Cookies.remove("adminToken");
                            router.push("/admin/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
            {children}
        </div>
    );
}
