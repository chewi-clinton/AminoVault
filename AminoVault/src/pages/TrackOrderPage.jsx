import React from "react";
import "../../src/styles/TrackOrderPage.css";

const TrackOrderPage = () => {
  return (
    <div className="track-order-wrapper">
      <section className="contact-hero-container">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Track Your Order</h1>
          <p className="contact-hero-description">
            Enter your Order ID and the email address used at checkout to see
            the latest updates on your order.
          </p>
        </div>
      </section>

      <section className="track-order-content-section">
        <div className="e-con-inner">
          <div className="elementor-widget-container">
            <div className="elementor-shortcode">
              <div className="woocommerce">
                <form
                  action="https://aminovault.com/order-tracking/"
                  method="post"
                  className="woocommerce-form woocommerce-form-track-order track_order"
                >
                  <p>
                    To track your order please enter your Order ID in the box
                    below and press the "Track" button. This was given to you on
                    your receipt and in the confirmation email you should have
                    received.
                  </p>

                  <p className="form-row form-row-first">
                    <label htmlFor="orderid">Order ID</label>
                    <input
                      className="input-text"
                      type="text"
                      name="orderid"
                      id="orderid"
                      placeholder="Found in your order confirmation email."
                    />
                  </p>

                  <p className="form-row form-row-last">
                    <label htmlFor="order_email">Billing email</label>
                    <input
                      className="input-text"
                      type="text"
                      name="order_email"
                      id="order_email"
                      placeholder="Email you used during checkout."
                    />
                  </p>

                  <div className="clear"></div>

                  <p className="form-row">
                    <button
                      type="submit"
                      className="button"
                      name="track"
                      value="Track"
                    >
                      Track
                    </button>
                  </p>

                  <input
                    type="hidden"
                    id="woocommerce-order-tracking-nonce"
                    name="woocommerce-order-tracking-nonce"
                    value="7a98a6ead4"
                  />
                  <input
                    type="hidden"
                    name="_wp_http_referer"
                    value="/order-tracking/"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackOrderPage;
