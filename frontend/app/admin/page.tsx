"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  amazonLink: string;
  flipkartLink: string;
  healthkartLink: string;
  price: number;
  clicks: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalClicks: 0, topProduct: null as any });
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchDashboardData = async () => {
    try {
      const token = Cookies.get("adminToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` } };
      
      const statsRes = await axios.get(`${API_URL}/api/admin/dashboard`, config);
      setStats(statsRes.data);

      const prodRes = await axios.get(`${API_URL}/api/products`);
      setProducts(prodRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) });
    } else {
      setForm({ ...form, name: e.target.value });
    }
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("adminToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/api/products/${form._id}`, form, config);
        alert("Product updated!");
      } else {
        await axios.post(`${API_URL}/api/products`, form, config);
        alert("Product added!");
      }
      setForm({});
      setIsEditing(false);
      fetchDashboardData();
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const editProduct = (product: Product) => {
    setForm(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const token = Cookies.get("adminToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, config);
      fetchDashboardData();
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center text-bg-dark h-100 shadow-sm border-warning">
            <div className="card-body">
              <h5 className="text-secondary fw-bold">Total Products</h5>
              <h2 className="text-warning display-5 fw-bold">{stats.totalProducts}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center text-bg-dark h-100 shadow-sm border-success">
            <div className="card-body">
              <h5 className="text-secondary fw-bold">Total Clicks</h5>
              <h2 className="text-success display-5 fw-bold">{stats.totalClicks}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center text-bg-dark h-100 shadow-sm border-info">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="text-secondary fw-bold">Top Product</h5>
              {stats.topProduct ? (
                <div>
                  <h4 className="text-info">{stats.topProduct.name}</h4>
                  <span className="badge bg-secondary">{stats.topProduct.clicks} clicks</span>
                </div>
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Form Column */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-black border-bottom border-warning">
              <h4 className="m-0 text-warning">{isEditing ? "Edit Product" : "Add New Product"}</h4>
            </div>
            <div className="card-body bg-dark">
              <form onSubmit={saveProduct}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" required value={form.name || ""} onChange={handleNameChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-control" name="slug" required value={form.slug || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-control" name="category" required value={form.category || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input type="number" className="form-control" name="price" required value={form.price || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-control" name="image" required value={form.image || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" rows={3} required value={form.description || ""} onChange={handleInputChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amazon Link</label>
                  <input type="url" className="form-control" name="amazonLink" value={form.amazonLink || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Flipkart Link</label>
                  <input type="url" className="form-control" name="flipkartLink" value={form.flipkartLink || ""} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Healthkart Link</label>
                  <input type="url" className="form-control" name="healthkartLink" value={form.healthkartLink || ""} onChange={handleInputChange} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-warning w-100 fw-bold">{isEditing ? "Update" : "Save"}</button>
                  {isEditing && (
                    <button type="button" className="btn btn-secondary w-100" onClick={() => { setIsEditing(false); setForm({}); }}>Cancel</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Table Column */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 bg-dark">
            <div className="card-body">
              <h4 className="text-light mb-4 border-bottom pb-2 border-secondary">Product List</h4>
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Img</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Clicks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                        </td>
                        <td>
                          <strong>{p.name}</strong><br/>
                          <small className="text-muted">{p.category}</small>
                        </td>
                        <td>₹{p.price}</td>
                        <td>
                          <span className="badge bg-success">{p.clicks}</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-info me-2" onClick={() => editProduct(p)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(p._id)}>Del</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
