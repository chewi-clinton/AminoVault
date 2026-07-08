import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminProducts.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders() {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState("");

  const fetchProducts = useCallback(async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const url = `${API}/api/products/admin/?search=${encodeURIComponent(q)}&ordering=sort_order`;
      const res = await fetch(url, { headers: authHeaders() });
      if (res.status === 401 || res.status === 403) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const data = await res.json();
      setProducts(data.results ?? data);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!search.trim()) { fetchProducts(); return; }
    const id = setTimeout(() => fetchProducts(search), 350);
    return () => clearTimeout(id);
  }, [search, fetchProducts]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/products/admin/${deleteTarget.id}/`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      setProducts((p) => p.filter((x) => x.id !== deleteTarget.id));
      showToast(`"${deleteTarget.name}" deleted.`);
    } catch {
      showToast("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <AdminLayout>
      <div className="avp-header">
        <div>
          <h2 className="avp-title">Products</h2>
          <p className="avp-count">{products.length} item{products.length !== 1 ? "s" : ""}</p>
        </div>
        <button className="avp-add-btn" onClick={() => navigate("/admin/products/add")}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add Product
        </button>
      </div>

      <div className="avp-toolbar">
        <div className="avp-search-wrap">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or SKU…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="avp-search"
          />
        </div>
      </div>

      {error && <div className="avp-error">{error}</div>}

      {loading ? (
        <div className="avp-loading">
          <div className="avp-spinner" />
          Loading products…
        </div>
      ) : products.length === 0 ? (
        <div className="avp-empty">No products found.</div>
      ) : (
        <div className="avp-table-wrap">
          <table className="avp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="avp-product-cell">
                      {p.image_src ? (
                        <img src={p.image_src} alt={p.name} className="avp-thumb" />
                      ) : (
                        <div className="avp-thumb-placeholder">
                          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9l4-4 4 4 4-4 4 4" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="avp-product-name">{p.name}</div>
                        {p.variant && <div className="avp-product-variant">{p.variant}</div>}
                      </div>
                    </div>
                  </td>
                  <td><code className="avp-sku">{p.sku}</code></td>
                  <td>{p.category_name || <span className="avp-muted">—</span>}</td>
                  <td>
                    <div className="avp-price-cell">
                      <span className="avp-price">${p.price}</span>
                      {p.old_price && (
                        <span className="avp-old-price">${p.old_price}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`avp-badge ${p.in_stock ? "avp-badge-green" : "avp-badge-red"}`}>
                      {p.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                    {p.is_featured && <span className="avp-badge avp-badge-purple">Featured</span>}
                  </td>
                  <td>
                    <div className="avp-actions">
                      <button
                        className="avp-action-btn avp-edit"
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                        title="Edit"
                      >
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="avp-action-btn avp-delete"
                        onClick={() => setDeleteTarget(p)}
                        title="Delete"
                      >
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="avp-modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="avp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="avp-modal-icon">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="avp-modal-title">Delete Product?</h3>
            <p className="avp-modal-body">
              <strong>"{deleteTarget.name}"</strong> will be permanently removed. This cannot be undone.
            </p>
            <div className="avp-modal-actions">
              <button className="avp-modal-cancel" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="avp-modal-confirm" onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="avp-toast">{toast}</div>}
    </AdminLayout>
  );
}
