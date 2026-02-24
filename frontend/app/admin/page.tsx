"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Package, Trash2, Edit, Plus, ExternalLink, BarChart3, Database } from "lucide-react";

export default function AdminDashboard() {
    const [products, setProducts] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalProducts: 0, totalClicks: 0 });
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "", image: "", description: "", amazonLink: "", flipkartLink: "", healthkartLink: "", category: "Whey Protein", lastUpdated: new Date().toISOString().split('T')[0]
    });

    const router = useRouter();

    const fetchAllData = async () => {
        const token = localStorage.getItem("gympro_admin_token");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

            const headers = { 'Authorization': `Bearer ${token}` };

            const [productsRes, statsRes] = await Promise.all([
                fetch(`${apiUrl}/products`, { headers }),
                fetch(`${apiUrl}/products/stats`, { headers })
            ]);

            if (productsRes.status === 401 || statsRes.status === 401) {
                localStorage.removeItem("gympro_admin_token");
                router.push("/admin/login");
                return;
            }

            const pData = await productsRes.json();
            const sData = await statsRes.json();

            setProducts(pData);
            setStats(sData);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsClient(true);
        fetchAllData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("gympro_admin_token");
        router.push("/admin/login");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const token = localStorage.getItem("gympro_admin_token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

        try {
            await fetch(`${apiUrl}/products/${id}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchAllData();
        } catch (err) {
            alert("Failed to delete product");
        }
    };

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            image: product.image || "",
            description: product.description || "",
            amazonLink: product.amazonLink || "",
            flipkartLink: product.flipkartLink || "",
            healthkartLink: product.healthkartLink || "",
            category: product.category || "Whey Protein",
            lastUpdated: product.lastUpdated || new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setFormData({
            name: "", image: "", description: "", amazonLink: "", flipkartLink: "", healthkartLink: "", category: "Whey Protein", lastUpdated: new Date().toISOString().split('T')[0]
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("gympro_admin_token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const method = editingProduct ? "PUT" : "POST";
        const url = editingProduct ? `${apiUrl}/products/${editingProduct.id}` : `${apiUrl}/products`;

        try {
            await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setIsModalOpen(false);
            fetchAllData();
        } catch (err) {
            alert("Error saving product");
        }
    };

    if (!isClient) return null;

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-black text-2xl animate-pulse">
            LOADING ADMIN...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
                        GymPro<span className="text-[#e62e5c]">Admin</span>
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button className="flex items-center gap-3 w-full p-3 bg-gray-800/50 text-[#e62e5c] font-bold rounded-xl border border-gray-800 transition-all">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    {/* Future nav items go here */}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                    <div className="mt-4 text-center">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-white flex items-center justify-center gap-1">
                            Visit Site <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto w-full">
                <header className="mb-8">
                    <h1 className="text-3xl font-black mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400 font-medium">Manage your supplements and track clicks.</p>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-[#111] p-6 rounded-3xl border border-gray-800 shadow-xl flex items-center gap-4 hover:border-gray-700 transition-all">
                        <div className="p-4 bg-gray-800 rounded-2xl text-[var(--primary)]">
                            <Database size={28} />
                        </div>
                        <div>
                            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">Total Products</p>
                            <h3 className="text-4xl font-black">{stats.totalProducts}</h3>
                        </div>
                    </div>
                    <div className="bg-[#111] p-6 rounded-3xl border border-gray-800 shadow-xl flex items-center gap-4 hover:border-[#e62e5c] transition-all">
                        <div className="p-4 bg-[#e62e5c]/20 rounded-2xl text-[#e62e5c]">
                            <BarChart3 size={28} />
                        </div>
                        <div>
                            <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">Total Clicks Sent</p>
                            <h3 className="text-4xl font-black text-[#e62e5c]">{stats.totalClicks}</h3>
                        </div>
                    </div>
                </div>

                {/* Products Table Area */}
                <div className="bg-[#111] rounded-3xl border border-gray-800 shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Package size={20} className="text-[#e62e5c]" />
                            Product Inventory
                        </h2>
                        <button
                            onClick={handleAddClick}
                            className="bg-[#e62e5c] hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-pink-500/20"
                        >
                            <Plus size={18} /> Add Product
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-bold">Product</th>
                                    <th className="p-4 font-bold">Category</th>
                                    <th className="p-4 font-bold">Clicks</th>
                                    <th className="p-4 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4 block w-64 md:w-auto">
                                                <img src={p.image || "/images/categories/supplements.svg"} alt={p.name} className="w-12 h-12 object-contain bg-[#0a0a0a] rounded-lg p-1 border border-gray-800 shrink-0" />
                                                <div className="font-bold text-sm line-clamp-2" title={p.name}>{p.name}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-black text-white">{p.clicks || 0}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleEditClick(p)} className="p-2 bg-gray-800 hover:bg-white hover:text-black rounded-lg transition-colors" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No products found. Add one above!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 border-b border-gray-800 pb-4 text-white">
                            {editingProduct ? <Edit size={24} className="text-[#e62e5c]" /> : <Plus size={24} className="text-[#e62e5c]" />}
                            {editingProduct ? "Edit Product" : "Add New Product"}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Product Name *</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#e62e5c] outline-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Category *</label>
                                    <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#e62e5c] outline-none appearance-none">
                                        <option value="Whey Protein">Whey Protein</option>
                                        <option value="Creatine">Creatine</option>
                                        <option value="Pre Workout">Pre Workout</option>
                                        <option value="Mass Gainer">Mass Gainer</option>
                                        <option value="BCAA">BCAA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Last Updated Date *</label>
                                    <input required type="date" value={formData.lastUpdated} onChange={e => setFormData({ ...formData, lastUpdated: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#e62e5c] outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Image URL *</label>
                                <input required type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#e62e5c] outline-none" placeholder="https://..." />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Short Description *</label>
                                <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-3 focus:border-[#e62e5c] outline-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-800 pt-4 mt-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Amazon Link</label>
                                    <input type="url" value={formData.amazonLink} onChange={e => setFormData({ ...formData, amazonLink: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-2 focus:border-amber-500 outline-none text-sm" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Flipkart Link</label>
                                    <input type="url" value={formData.flipkartLink} onChange={e => setFormData({ ...formData, flipkartLink: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-2 focus:border-blue-500 outline-none text-sm" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">HealthKart Link</label>
                                    <input type="url" value={formData.healthkartLink} onChange={e => setFormData({ ...formData, healthkartLink: e.target.value })} className="w-full bg-[#0a0a0a] border border-gray-800 text-white rounded-xl px-4 py-2 focus:border-teal-500 outline-none text-sm" placeholder="https://..." />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold rounded-xl text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 font-black rounded-xl text-white bg-[#e62e5c] hover:bg-pink-600 shadow-lg transition-colors">
                                    {editingProduct ? "Save Changes" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
