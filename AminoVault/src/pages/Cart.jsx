import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Cart = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const {
    addToCart,
    shippingProtection,
    setShippingProtection,
    couponCode,
    setCouponCode,
    setAppliedCoupon,
  } = useCart();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCouponOpen, setIsCouponOpen] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [upsellItems, setUpsellItems] = useState([]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
    0
  );

  // Fetch real upsell products from API
  useEffect(() => {
    fetch(`${API}/api/products/?is_upsell=true&page_size=5`)
      .then((r) => r.json())
      .then((data) => {
        const items = data.results ?? data;
        setUpsellItems(
          items.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            oldPrice: p.old_price || null,
            img: p.image_src || p.image_url || "",
            variant: p.variant,
            sku: p.sku,
          }))
        );
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (upsellItems.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upsellItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [upsellItems.length]);

  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? upsellItems.length - 1 : prev - 1));
  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev === upsellItems.length - 1 ? 0 : prev + 1));

  const calculateDiscount = (oldPrice, price) => {
    const old = parseFloat(oldPrice || 0);
    const current = parseFloat(price || 0);
    if (old > current) return `Save ${Math.round(((old - current) / old) * 100)}%`;
    return null;
  };

  async function applyCode() {
    if (!couponInput.trim()) return;
    try {
      const res = await fetch(`${API}/api/products/coupons/validate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim().toUpperCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        setCouponCode(couponInput.trim().toUpperCase());
        setAppliedCoupon(data);
        setCouponMsg({ ok: true, text: `Coupon applied: ${data.discount}% off` });
      } else {
        setCouponMsg({ ok: false, text: data.detail || "Invalid coupon code." });
      }
    } catch {
      setCouponMsg({ ok: false, text: "Could not validate coupon." });
    }
  }

  function handleCheckout() {
    onClose();
    navigate("/checkout");
  }

  return (
    <>
      {isOpen && <div className="cart-backdrop visible" onClick={onClose} />}

      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>
            Review Your Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="cart-scrollable">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={80} strokeWidth={1.2} className="empty-icon" />
              <div className="fkcart-zero-state-title">Your Cart is Empty</div>
              <div className="fkcart-zero-state-text">
                Fill your cart with amazing items
              </div>
              <button className="shop-now-btn" onClick={onClose}>
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => {
                  const hasDiscount =
                    parseFloat(item.oldPrice || 0) > parseFloat(item.price || 0);
                  const discountText = hasDiscount
                    ? calculateDiscount(item.oldPrice, item.price)
                    : null;

                  return (
                    <div key={item.id} className="cart-item">
                      <div className="item-image-container">
                        <button
                          className="remove-btn"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <X size={13} />
                        </button>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="item-image"
                        />
                      </div>

                      <div className="item-main">
                        <h4 className="item-name">{item.name}</h4>
                        {item.variant && (
                          <p className="item-variant">{item.variant}</p>
                        )}
                        <div className="quantity-control">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="item-price-section">
                        <div className="price-row">
                          {hasDiscount && (
                            <span className="original-price">
                              ${parseFloat(item.oldPrice).toFixed(2)}
                            </span>
                          )}
                          <span className="current-price">
                            ${parseFloat(item.price).toFixed(2)}
                          </span>
                        </div>
                        {discountText && (
                          <span className="discount">{discountText}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {upsellItems.length > 0 && (
                <div className="fbt-section">
                  <h3>Frequently Bought Together</h3>
                  <div className="fbt-carousel">
                    {upsellItems.length > 1 && (
                      <>
                        <button className="fbt-nav-btn fbt-nav-prev" onClick={goToPrevSlide}>‹</button>
                        <button className="fbt-nav-btn fbt-nav-next" onClick={goToNextSlide}>›</button>
                      </>
                    )}
                    <div
                      className="fbt-carousel-track"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {upsellItems.map((item) => (
                        <div key={item.id} className="fbt-slide">
                          <img src={item.img} alt={item.name} className="fbt-item-image" />
                          <div className="fbt-item-info">
                            <p className="fbt-name">{item.name}</p>
                            <button className="fbt-add-btn" onClick={() => addToCart(item)}>
                              Add
                            </button>
                          </div>
                          <div className="fbt-price-section">
                            {item.oldPrice && parseFloat(item.oldPrice) > parseFloat(item.price) && (
                              <span className="fbt-original-price">${item.oldPrice}</span>
                            )}
                            <span className="fbt-current-price">${item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {upsellItems.length > 1 && (
                    <div className="fbt-dots">
                      {upsellItems.map((_, index) => (
                        <button
                          key={index}
                          className={`fbt-dot ${index === currentSlide ? "active" : ""}`}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="discount-section">
              <div className="coupon-header" onClick={() => setIsCouponOpen(!isCouponOpen)}>
                <p>Got a discount code?</p>
                <span className={`coupon-toggle-icon ${isCouponOpen ? "open" : ""}`}>
                  <ChevronDown size={22} />
                </span>
              </div>
              <div className={`coupon-content ${!isCouponOpen ? "collapsed" : ""}`}>
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponMsg(null);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyCode()}
                  />
                  <button className="apply-btn" onClick={applyCode}>
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p style={{ fontSize: "12px", marginTop: "6px", color: couponMsg.ok ? "#4ade80" : "#f87171" }}>
                    {couponMsg.text}
                  </p>
                )}
              </div>
            </div>

            <div className="shipping-protection">
              <div className="protection-row">
                <img
                  src="https://aminovault.com/wp-content/plugins/cart-for-woocommerce//assets/img/security-batch.jpg"
                  alt="Security"
                  className="security-image"
                />
                <div className="protection-text">
                  <p>Shipping protection</p>
                  <small>Protect your order from damage or theft during shipping.</small>
                </div>
                <span className="protection-price">$4.50</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={shippingProtection}
                  onChange={(e) => setShippingProtection(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="subtotal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <p className="note">Shipping &amp; taxes may be re-calculated at checkout</p>

            <button className="checkout-btn" onClick={handleCheckout}>
              <ShoppingCart size={20} />
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
