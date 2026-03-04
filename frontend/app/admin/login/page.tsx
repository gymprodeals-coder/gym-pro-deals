"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/login`, {
        email,
        password,
      });
      Cookies.set("adminToken", data.token, { expires: 1 });
      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center text-warning fw-bold mb-4">Admin Login</h3>
        {error && <div className="alert alert-danger p-2">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input 
              type="email" 
              className="form-control" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input 
              type="password" 
              className="form-control" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}
