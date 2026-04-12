import React, { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const { addToCart } = useCart();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Coupon collapsible state
  const [isCouponOpen, setIsCouponOpen] = useState(true);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
    0,
  );

  // Upsell items for carousel
  const upsellItems = [
    {
      id: 100,
      name: "NAD+ 1000mg",
      oldPrice: "207.00",
      price: "175.95",
      img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/NAD1000MGnew1.webp",
    },
    {
      id: 101,
      name: "BPC-157 10mg",
      oldPrice: "64.00",
      price: "64.00",
      img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/BPC10MGAV-.webp",
    },
    {
      id: 102,
      name: "KPV 10mg",
      oldPrice: "87.00",
      price: "69.60",
      img: "https://aminovault.com/wp-content/uploads/2025/07/kpv10mgav-150x150.webp",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (upsellItems.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upsellItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [upsellItems.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? upsellItems.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === upsellItems.length - 1 ? 0 : prev + 1));
  };

  // Toggle coupon section
  const toggleCoupon = () => {
    setIsCouponOpen(!isCouponOpen);
  };

  // Helper function to calculate discount percentage
  const calculateDiscount = (oldPrice, price) => {
    const old = parseFloat(oldPrice || 0);
    const current = parseFloat(price || 0);
    if (old > current) {
      const discountPercent = Math.round(((old - current) / old) * 100);
      return `Save ${discountPercent}%`;
    }
    return null;
  };

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
              <ShoppingCart
                size={80}
                strokeWidth={1.2}
                className="empty-icon"
              />
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
              {/* Cart Items - WITH OLD PRICE + DISCOUNT */}
              <div className="cart-items">
                {cartItems.map((item) => {
                  const hasDiscount =
                    parseFloat(item.oldPrice || 0) >
                    parseFloat(item.price || 0);
                  const discountText = hasDiscount
                    ? calculateDiscount(item.oldPrice, item.price)
                    : null;

                  return (
                    <div key={item.id} className="cart-item">
                      {/* Image Container with X Button */}
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

                      {/* Item Info */}
                      <div className="item-main">
                        <h4 className="item-name">{item.name}</h4>
                        {item.variant && (
                          <p className="item-variant">{item.variant}</p>
                        )}

                        {/* Quantity Control */}
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price Section - WITH OLD PRICE + SAVE % */}
                      <div className="item-price-section">
                        <div className="price-row">
                          {/* Show strikethrough old price IF it exists and is higher */}
                          {hasDiscount && (
                            <span className="original-price">
                              ${parseFloat(item.oldPrice).toFixed(2)}
                            </span>
                          )}

                          {/* Current price */}
                          <span className="current-price">
                            ${parseFloat(item.price).toFixed(2)}
                          </span>
                        </div>

                        {/* Show "Save X%" IF there's a discount */}
                        {discountText && (
                          <span className="discount">{discountText}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Frequently Bought Together - Carousel with Simple Arrows */}
              {upsellItems.length > 0 && (
                <div className="fbt-section">
                  <h3>Frequently Bought Together</h3>

                  <div className="fbt-carousel">
                    {/* Simple Navigation Arrows - NO CIRCLES, just < and > */}
                    {upsellItems.length > 1 && (
                      <>
                        <button
                          className="fbt-nav-btn fbt-nav-prev"
                          onClick={goToPrevSlide}
                          aria-label="Previous product"
                        >
                          ‹ {/* Simple left arrow character */}
                        </button>
                        <button
                          className="fbt-nav-btn fbt-nav-next"
                          onClick={goToNextSlide}
                          aria-label="Next product"
                        >
                          › {/* Simple right arrow character */}
                        </button>
                      </>
                    )}

                    {/* Carousel Track */}
                    <div
                      className="fbt-carousel-track"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {upsellItems.map((item) => (
                        <div key={item.id} className="fbt-slide">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="fbt-item-image"
                          />

                          <div className="fbt-item-info">
                            <p className="fbt-name">{item.name}</p>
                            <button
                              className="fbt-add-btn"
                              onClick={() => addToCart(item)}
                            >
                              Add
                            </button>
                          </div>

                          <div className="fbt-price-section">
                            {parseFloat(item.oldPrice) >
                              parseFloat(item.price) && (
                              <span className="fbt-original-price">
                                ${item.oldPrice}
                              </span>
                            )}
                            <span className="fbt-current-price">
                              ${item.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dot Indicators */}
                  {upsellItems.length > 1 && (
                    <div className="fbt-dots">
                      {upsellItems.map((_, index) => (
                        <button
                          key={index}
                          className={`fbt-dot ${index === currentSlide ? "active" : ""}`}
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sticky Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Collapsible Coupon Section */}
            <div className="discount-section">
              <div className="coupon-header" onClick={toggleCoupon}>
                <p>Got a discount code?</p>
                <span
                  className={`coupon-toggle-icon ${isCouponOpen ? "open" : ""}`}
                >
                  <ChevronDown size={22} />
                </span>
              </div>

              <div
                className={`coupon-content ${!isCouponOpen ? "collapsed" : ""}`}
              >
                <div className="coupon-input">
                  <input type="text" placeholder="Coupon Code" />
                  <button className="apply-btn">Apply</button>
                </div>
              </div>
            </div>

            {/* Shipping Protection */}
            <div className="shipping-protection">
              <div className="protection-row">
                <img
                  src="https://aminovault.com/wp-content/plugins/cart-for-woocommerce//assets/img/security-batch.jpg"
                  alt="Security"
                  className="security-image"
                />
                <div className="protection-text">
                  <p>Shipping protection</p>
                  <small>
                    Protect your order from damage or theft during shipping.
                  </small>
                </div>
                <span className="protection-price">$4.50</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            {/* Subtotal */}
            <div className="subtotal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <p className="note">
              Shipping & taxes may be re-calculated at checkout
            </p>

            {/* Checkout Button */}
            <button className="checkout-btn">
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
