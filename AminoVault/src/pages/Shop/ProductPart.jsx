import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../styles/ProductPart.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductPart = ({ categorySlug }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page_size: "100" });
    if (categorySlug) params.set("category__slug", categorySlug);
    fetch(`${API}/api/products/?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        const items = data.results ?? data;
        setProducts(
          items.map((p) => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            variant: p.variant,
            price: p.price,
            oldPrice: p.old_price || null,
            img: p.image_src || p.image_url || "",
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading) {
    return (
      <section className="product-part-section">
        <h2 className="collection-heading">Our Peptide Collection</h2>
        <div className="products-loading">Loading products…</div>
      </section>
    );
  }

  return (
    <section className="product-part-section">
      <h2 className="collection-heading">Our Peptide Collection</h2>

      <div className="items-grid">
        {products.map((product) => (
          <div key={product.id} className="item-card">
            <Link to={`/product/${product.id}`} className="image-container">
              <img src={product.img} alt={product.name} className="item-img" />
            </Link>

            <div className="item-info">
              <h5 className="item-title">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h5>

              <div className="card-footer-row">
                <div className="pricing-container">
                  <div className="price">
                    {product.oldPrice && <del>${product.oldPrice}</del>}
                    <ins>${product.price}</ins>
                  </div>
                </div>

                <div className="cart-form-container">
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPart;
