import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/ProductPart.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ProductPart = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/products/?page_size=100`)
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
  }, []);

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
            <div className="image-container">
              <img src={product.img} alt={product.name} className="item-img" />
            </div>

            <div className="item-info">
              <h5 className="item-title">
                <a href={`/product/${product.id}`}>{product.name}</a>
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
