import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminProductForm.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const EMPTY = {
  name: "", sku: "", variant: "", price: "", old_price: "",
  description: "", image_url: "", sort_order: "0",
  category_id: "", in_stock: true, is_featured: false, is_upsell: false,
};

function authHeaders(isJson = true) {
  const token = localStorage.getItem("adminToken");
  const h = { Authorization: `Bearer ${token}` };
  if (isJson) h["Content-Type"] = "application/json";
  return h;
}

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  // Load categories
  useEffect(() => {
    fetch(`${API}/api/products/categories/`)
      .then((r) => r.json())
      .then((d) => setCategories(d.results ?? d))
      .catch(() => {});
  }, []);

  // Load existing product when editing
  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API}/api/products/admin/${id}/`, { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401 || r.status === 403) navigate("/admin/login", { replace: true });
        return r.json();
      })
      .then((p) => {
        setForm({
          name: p.name ?? "",
          sku: p.sku ?? "",
          variant: p.variant ?? "",
          price: p.price ?? "",
          old_price: p.old_price ?? "",
          description: p.description ?? "",
          image_url: p.image_url ?? "",
          sort_order: String(p.sort_order ?? 0),
          category_id: p.category_id ?? "",
          in_stock: p.in_stock ?? true,
          is_featured: p.is_featured ?? false,
          is_upsell: p.is_upsell ?? false,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => { const n = { ...er }; delete n[name]; return n; });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const body = {
      name: form.name,
      sku: form.sku,
      variant: form.variant,
      price: form.price,
      old_price: form.old_price || null,
      description: form.description,
      image_url: form.image_url,
      sort_order: parseInt(form.sort_order, 10) || 0,
      category_id: form.category_id || null,
      in_stock: form.in_stock,
      is_featured: form.is_featured,
      is_upsell: form.is_upsell,
    };

    try {
      const url = isEdit
        ? `${API}/api/products/admin/${id}/`
        : `${API}/api/products/admin/`;
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(typeof data === "object" ? data : { non_field_errors: [String(data)] });
        return;
      }

      showToast(isEdit ? "Product updated!" : "Product created!");
      setTimeout(() => navigate("/admin/products"), 800);
    } catch {
      setErrors({ non_field_errors: ["Network error. Please try again."] });
    } finally {
      setSaving(false);
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="avf-loading">
          <div className="avf-spinner" /> Loading product…
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="avf-header">
        <button className="avf-back" onClick={() => navigate("/admin/products")}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Products
        </button>
        <h2 className="avf-title">{isEdit ? "Edit Product" : "Add New Product"}</h2>
      </div>

      <form className="avf-form" onSubmit={handleSubmit} noValidate>
        {errors.non_field_errors && (
          <div className="avf-error-banner">{errors.non_field_errors[0]}</div>
        )}

        <div className="avf-grid">
          {/* Left column */}
          <div className="avf-col">
            <div className="avf-card">
              <h3 className="avf-card-title">Basic Info</h3>

              <Field label="Product Name" error={errors.name}>
                <input name="name" value={form.name} onChange={onChange} required placeholder="e.g. BPC-157" />
              </Field>

              <Field label="SKU" error={errors.sku}>
                <input name="sku" value={form.sku} onChange={onChange} required placeholder="e.g. BPC157-10MG" />
              </Field>

              <Field label="Variant" error={errors.variant} hint="e.g. 10mg, 5mg, 1000mg">
                <input name="variant" value={form.variant} onChange={onChange} placeholder="10mg" />
              </Field>

              <Field label="Description" error={errors.description}>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  rows={4}
                  placeholder="Short product description…"
                />
              </Field>
            </div>

            <div className="avf-card">
              <h3 className="avf-card-title">Image</h3>
              <Field label="Image URL" error={errors.image_url} hint="Direct URL to product image (JPG/PNG/WebP)">
                <input
                  name="image_url"
                  value={form.image_url}
                  onChange={onChange}
                  type="url"
                  placeholder="https://…"
                />
              </Field>
              {form.image_url && (
                <div className="avf-image-preview">
                  <img src={form.image_url} alt="Preview" onError={(e) => (e.target.style.display = "none")} />
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="avf-col">
            <div className="avf-card">
              <h3 className="avf-card-title">Pricing</h3>

              <div className="avf-row-2">
                <Field label="Price ($)" error={errors.price}>
                  <input name="price" value={form.price} onChange={onChange} required type="number" step="0.01" min="0" placeholder="64.00" />
                </Field>
                <Field label="Original Price ($)" error={errors.old_price} hint="Leave empty if no discount">
                  <input name="old_price" value={form.old_price} onChange={onChange} type="number" step="0.01" min="0" placeholder="80.00" />
                </Field>
              </div>
            </div>

            <div className="avf-card">
              <h3 className="avf-card-title">Organisation</h3>

              <Field label="Category" error={errors.category_id}>
                <select name="category_id" value={form.category_id} onChange={onChange}>
                  <option value="">— No category —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>

              <Field label="Sort Order" error={errors.sort_order} hint="Lower numbers appear first">
                <input name="sort_order" value={form.sort_order} onChange={onChange} type="number" min="0" />
              </Field>
            </div>

            <div className="avf-card">
              <h3 className="avf-card-title">Flags</h3>

              <div className="avf-toggles">
                <Toggle name="in_stock" checked={form.in_stock} onChange={onChange} label="In Stock" desc="Product is available for purchase" />
                <Toggle name="is_featured" checked={form.is_featured} onChange={onChange} label="Featured" desc="Show in featured sections" />
                <Toggle name="is_upsell" checked={form.is_upsell} onChange={onChange} label="Upsell / FBT" desc="Show in cart's Frequently Bought Together" />
              </div>
            </div>
          </div>
        </div>

        <div className="avf-footer">
          <button type="button" className="avf-cancel" onClick={() => navigate("/admin/products")}>
            Cancel
          </button>
          <button type="submit" className="avf-save" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>

      {toast && <div className="avf-toast avf-toast-success">{toast}</div>}
    </AdminLayout>
  );
}

function Field({ label, children, error, hint }) {
  return (
    <div className="avf-field">
      <label className="avf-label">{label}</label>
      {children}
      {hint && !error && <span className="avf-hint">{hint}</span>}
      {error && <span className="avf-field-error">{Array.isArray(error) ? error[0] : error}</span>}
    </div>
  );
}

function Toggle({ name, checked, onChange, label, desc }) {
  return (
    <label className="avf-toggle">
      <div className="avf-toggle-info">
        <span className="avf-toggle-label">{label}</span>
        <span className="avf-toggle-desc">{desc}</span>
      </div>
      <div className={`avf-switch ${checked ? "on" : ""}`}>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <span className="avf-switch-thumb" />
      </div>
    </label>
  );
}
