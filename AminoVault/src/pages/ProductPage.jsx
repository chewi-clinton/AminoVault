import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../styles/ProductPage.css";
import { useCart } from "../context/CartContext";
import faqData from "../data/faqData";
import certGmp from "../assets/product/cert-gmp.webp";
import certUsa from "../assets/product/cert-usa.png";
import galleryImg1 from "../assets/product/gallery-1.webp";
import galleryImg2 from "../assets/product/gallery-2.webp";
import galleryImg3 from "../assets/product/gallery-3.webp";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const faqs = faqData;

function getBulkInfo(qty) {
  if (qty >= 8) {
    return { tier: 20, nextGoal: null, nextTier: null, progressGoal: 8 };
  }
  if (qty >= 6) {
    return { tier: 18, nextGoal: 8, nextTier: 20, progressGoal: 8 };
  }
  return { tier: 15, nextGoal: 6, nextTier: 18, progressGoal: 6 };
}

function mapProduct(p) {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    description: p.description,
    price: p.price,
    oldPrice: p.old_price || null,
    img: p.image_src || p.image_url || "",
    variant: p.variant,
    inStock: p.in_stock,
    discountPercentage: p.discount_percentage || 0,
    category: p.category || null,
    longDescriptionHtml: p.long_description_html || "",
  };
}

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setProduct(null);

    fetch(`${API}/api/products/${id}/`)
      .then((r) => {
        if (!r.ok) throw new Error("not-found");
        return r.json();
      })
      .then((data) => setProduct(mapProduct(data)))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const params = new URLSearchParams({ page_size: "4" });
    if (product.category?.slug) {
      params.set("category__slug", product.category.slug);
    }
    fetch(`${API}/api/products/?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        const items = (data.results ?? data)
          .filter((p) => p.id !== product.id)
          .slice(0, 4)
          .map(mapProduct);
        setRelated(items);
      })
      .catch(() => {});
  }, [product]);

  function toggleFaq(index) {
    setOpenFaq(openFaq === index ? null : index);
  }

  function handleAddToCart() {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        img: product.img,
        variant: product.variant,
        sku: product.sku,
      },
      quantity
    );
    openCart();
  }

  if (loading) {
    return (
      <div className="product-container">
        <p style={{ padding: "60px 0", textAlign: "center", width: "100%" }}>
          Loading product…
        </p>
      </div>
    );
  }

  const bulkInfo = getBulkInfo(quantity);

  if (notFound || !product) {
    return (
      <div className="product-container">
        <div style={{ padding: "60px 0", textAlign: "center", width: "100%" }}>
          <h2>Product not found</h2>
          <p>This product may have been removed or is no longer available.</p>
          <button className="add-to-cart-btn" onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <img
              src={product.img}
              alt={product.name}
              className="main-image"
            />
          </div>
        </div>

        <div className="product-details">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> /{" "}
            {product.category ? (
              <>
                <Link to={`/shop/${product.category.slug}`}>
                  {product.category.name}
                </Link>{" "}
                /{" "}
              </>
            ) : null}
            <span className="current">{product.name}</span>
          </nav>

          <h1 className="product-title">{product.name}</h1>

          <div className="product-price">
            {product.oldPrice && <del>${parseFloat(product.oldPrice).toFixed(2)}</del>}
            <ins>${parseFloat(product.price).toFixed(2)}</ins>
          </div>

          <p className="stock-status">
            {product.inStock ? "In stock" : "Out of stock"}
          </p>

          <div className="add-to-cart-wrapper">
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
            />
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add To Cart" : "Out of Stock"}
            </button>
          </div>

          <div className="bulk-savings-widget">
            <div className="bulk-header">
              <div className="bulk-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  width="16"
                  height="16"
                >
                  <path
                    d="M12 2l3 6 6 .9-4.5 4.4 1.1 6.2L12 16.9 6.4 19.5l1.1-6.2L3 8.9 9 8l3-6z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  ></path>
                </svg>
                Bulk savings
              </div>
              <span className="bulk-tiers-text">15% off, 18% for 6+, 20% for 8+</span>
            </div>

            <div className="bulk-live-msg">
              {bulkInfo.nextGoal
                ? `You've got ${bulkInfo.tier}% off. Add ${bulkInfo.nextGoal}+ bottles to unlock ${bulkInfo.nextTier}%${
                    bulkInfo.nextGoal === 6 ? ", add 8+ for 20%." : "."
                  }`
                : `You've got ${bulkInfo.tier}% off — our maximum bulk discount!`}
            </div>

            {bulkInfo.nextGoal && (
              <div className="bulk-progress-container">
                <div className="bulk-progress-bar">
                  <div
                    className="bulk-progress-fill"
                    style={{
                      width: `${Math.min(100, (quantity / bulkInfo.progressGoal) * 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="bulk-progress-meta">
                  <span>Add bottles to save</span>
                  <span>Goal: {bulkInfo.progressGoal}+</span>
                </div>
              </div>
            )}

            <details className="bulk-dropdown">
              <summary>
                <span>See discount tiers</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  width="16"
                  height="16"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </summary>
              <table className="bulk-table">
                <tbody>
                  <tr>
                    <td>6+ vials</td>
                    <td>
                      <span className="tier-badge">18% off</span>
                    </td>
                  </tr>
                  <tr>
                    <td>8+ vials</td>
                    <td>
                      <span className="tier-badge">20% off</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>
          </div>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">5 Star Rating by 1000+ Customers</span>
          </div>

          <div className="product-description">
            <h5>{product.variant}</h5>
            <p>
              {product.description ||
                "This compound is intended strictly for laboratory research use only and is not for human or veterinary use."}
            </p>
          </div>

          <div className="purity-banner">
            <h4 className="purity-title">
              LOCKED IN PURITY WITH THIRD PARTY TESTING
            </h4>
            <p className="purity-text">
              <strong>
                Dual Tested • ISO/IEC 17025 Accredited Lab Results
              </strong>
              <br />
              Independently analyzed by an{" "}
              <strong>ISO/IEC 17025:2017 accredited</strong> lab. Each batch
              includes a <strong>verifiable COA</strong> showing identity
              (LC-MS/MS/HPLC), purity %, and full batch traceability.
            </p>
            <Link to="/lab-results" className="lab-results-link">
              View Lab Results Here
            </Link>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <span>Satisfaction Guaranteed</span>
            </div>
            <div className="feature-item">
              <span>Secure Ordering</span>
            </div>
            <div className="feature-item">
              <span>Third-Party Tested</span>
            </div>
            <div className="feature-item">
              <span>Fast, Reliable Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ext-bottom-section">
        <div className="ext-left-col">
          <div className="ext-tabs-wrapper">
            <ul className="ext-tabs-nav" role="tablist">
              <li>
                <button
                  className={`ext-tab-btn ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")}
                  role="tab"
                  aria-selected={activeTab === "description"}
                >
                  Description
                </button>
              </li>
              <li>
                <button
                  className={`ext-tab-btn ${activeTab === "additional" ? "active" : ""}`}
                  onClick={() => setActiveTab("additional")}
                  role="tab"
                  aria-selected={activeTab === "additional"}
                >
                  Additional information
                </button>
              </li>
            </ul>

            <div
              className={`ext-tab-panel ${activeTab === "description" ? "active" : ""}`}
              role="tabpanel"
            >
              <h2>Description</h2>
              {product.longDescriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.longDescriptionHtml }}
                />
              ) : (
                <>
                  <p>
                    {product.description ||
                      `${product.name} is supplied strictly for laboratory research purposes. This product is not a drug, dietary supplement, cosmetic, food ingredient, or consumer product. It is not intended to diagnose, treat, cure, prevent, or mitigate any disease or medical condition.`}
                  </p>
                  <p>
                    This material should only be handled by qualified professionals
                    in appropriate laboratory settings. Any human or animal use is
                    strictly prohibited.
                  </p>
                </>
              )}
            </div>

            <div
              className={`ext-tab-panel ${activeTab === "additional" ? "active" : ""}`}
              role="tabpanel"
            >
              <h2>Additional information</h2>
              <table className="ext-info-table">
                <tbody>
                  <tr>
                    <th scope="row">SKU</th>
                    <td>{product.sku}</td>
                  </tr>
                  {product.variant && (
                    <tr>
                      <th scope="row">Variant</th>
                      <td>{product.variant}</td>
                    </tr>
                  )}
                  {product.category && (
                    <tr>
                      <th scope="row">Category</th>
                      <td>{product.category.name}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="ext-right-col">
          <div className="ext-faq-section">
            <h3 className="ext-faq-section-title">
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="ext-faq-stack">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="ext-faq-item">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="ext-faq-trigger"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="ext-faq-panel">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ext-cert-section">
            <h3 className="ext-cert-title">Product Certifications</h3>
            <div className="ext-cert-grid">
              <img src={certGmp} alt="GMP Certified" className="ext-cert-badge" />
              <img src={certUsa} alt="Made in USA" className="ext-cert-badge" />
            </div>
          </div>
        </div>
      </div>

      <div className="ext-gallery-section">
        <div className="ext-gallery-grid">
          <div
            className="ext-gallery-item"
            style={{ backgroundImage: `url(${galleryImg1})` }}
          ></div>
          <div
            className="ext-gallery-item"
            style={{ backgroundImage: `url(${galleryImg2})` }}
          ></div>
          <div
            className="ext-gallery-item"
            style={{ backgroundImage: `url(${galleryImg3})` }}
          ></div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="ext-related-section">
          <h3 className="ext-related-title">Explore Related Research Peptides</h3>
          <div className="ext-related-grid">
            {related.map((item) => (
              <div key={item.id} className="ext-product-card">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="ext-product-card-img"
                  />
                </Link>
                <div className="ext-product-card-body">
                  <h5 className="ext-product-card-title">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h5>
                  <div className="ext-product-card-footer">
                    <p className="ext-product-card-price">
                      {item.oldPrice && <del>${item.oldPrice}</del>}{" "}
                      <ins>${item.price}</ins>
                    </p>
                    <button
                      className="ext-product-card-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
