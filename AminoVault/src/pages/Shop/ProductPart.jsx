import React from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/ProductPart.css";

const products = [
  {
    id: 1,
    sku: "20-1974-69",
    name: "Hospira BAC Water 30 ML",
    oldPrice: "33.99",
    price: "33.99",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2026/03/hospira_bac.webp",
  },
  {
    id: 2,
    sku: "10-56897-12-1",
    name: "CJC-1295 + Ipamorelin",
    oldPrice: "98.99",
    price: "98.99",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/12/cjc-ipa10mg.webp",
  },
  {
    id: 3,
    sku: "10-56897-12",
    name: "CJC-1295 No DAC 10mg",
    oldPrice: "98.00",
    price: "98.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/CJC1295NODAC.webp",
  },
  {
    id: 4,
    sku: "07-1921-10",
    name: "GHK-Cu 100mg",
    oldPrice: "61.00",
    price: "61.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/GHKHADOW_AV.webp",
  },
  {
    id: 5,
    sku: "19-1221-10",
    name: "Glucagon-Like Peptide-1 (7-36) 10mg",
    oldPrice: "93.00",
    price: "79.05",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/ShadowGLP-1.webp",
  },
  {
    id: 6,
    sku: "20-1896-10",
    name: "GLP-2 (T) 10mg",
    oldPrice: "98.00",
    price: "83.30",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/ShadowGLP-2.webp",
  },
  {
    id: 7,
    sku: "18-1193-10",
    name: "GLP-3 (R) LY3437943 20mg",
    oldPrice: "228.00",
    price: "228.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/GLP3R-1.webp",
  },
  {
    id: 8,
    sku: "86-4573-19",
    name: "KLOW Stack 80mg",
    oldPrice: "149.99",
    price: "149.99",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/KLOW80MG.webp",
  },
  {
    id: 9,
    sku: "09-1795-10",
    name: "Ipamorelin 10mg",
    oldPrice: "64.00",
    price: "64.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/IPASHADOW_AV.webp",
  },
  {
    id: 10,
    sku: "02-1192-10",
    name: "BPC-157 10mg",
    oldPrice: "64.00",
    price: "64.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/BPC10MGAV-.webp",
  },
  {
    id: 11,
    sku: "02-1192-10-1456",
    name: "Wolverine Blend BPC-157 / TB-500",
    oldPrice: "125.00",
    price: "125.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/12/wolverine.webp",
  },
  {
    id: 12,
    sku: "87-4993-19",
    name: "Melanotan II 10mg",
    oldPrice: "61.50",
    price: "61.50",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/Melanotan-II-new.webp",
  },
  {
    id: 13,
    sku: "13-1576-10",
    name: "MOTS-c 10mg",
    oldPrice: "59.50",
    price: "59.50",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/MOTSSHADOW_AV.webp",
  },
  {
    id: 14,
    sku: "14-1197-50",
    name: "NAD+ 1000mg",
    oldPrice: "207.00",
    price: "175.95",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/NAD1000MGnew1.webp",
  },
  {
    id: 15,
    sku: "86-4573-373",
    name: "Selank Semax Blend (seperate bottles)",
    oldPrice: "170.00",
    price: "170.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/selank-semac-blend-1.webp",
  },
  {
    id: 16,
    sku: "36-1446-10",
    name: "Sermorelin 5mg",
    oldPrice: "58.50",
    price: "58.50",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SERMORELIN-5-MG-NEW1.webp",
  },
  {
    id: 17,
    sku: "28-11296-1",
    name: "SS-31 10MG",
    oldPrice: "63.00",
    price: "63.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/SS31-1.webp",
  },
  {
    id: 18,
    sku: "20-1980-10",
    name: "TB-500 10mg",
    oldPrice: "61.00",
    price: "61.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/TB500SHADOW_AV.webp",
  },
  {
    id: 19,
    sku: "12-1194-72",
    name: "KPV 10mg",
    oldPrice: "87.00",
    price: "69.60",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/kpv10mgav.webp",
  },
  {
    id: 20,
    sku: "07-1196-15",
    name: "L-Glutathione 1500mg",
    oldPrice: "85.50",
    price: "85.50",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/LGLUTSHADOW_AV.webp",
  },
  {
    id: 21,
    sku: "22-1894-15",
    name: "Thymalin 10mg",
    oldPrice: "69.00",
    price: "69.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/Thymalin10MG.webp",
  },
  {
    id: 22,
    sku: "14-1197-73",
    name: "Thymosin Alpha-1 10 mg",
    oldPrice: "120.00",
    price: "120.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/thymosinalpha1.webp",
  },
  {
    id: 23,
    sku: "32-1346-105",
    name: "Vitamin B12 20ml",
    oldPrice: "69.00",
    price: "69.00",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/B1220ML.webp",
  },
  {
    id: 24,
    sku: "20-1842-10",
    name: "Tesamorelin 10mg",
    oldPrice: "98.50",
    price: "98.50",
    img: "https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_webp,s_webp/aminovault.com/wp-content/uploads/2025/07/TESASHADOW_AV.webp",
  },
];

const ProductPart = () => {
  const { addToCart } = useCart();

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
                    {/* Always show old price if it exists */}
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
