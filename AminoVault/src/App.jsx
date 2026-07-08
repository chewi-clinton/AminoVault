import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Public pages
import HomePage from "./pages/HomePage.jsx";
import Shoppage from "./pages/Shoppage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FAQsPage from "./pages/FAQsPage.jsx";
import LabResultPage from "./pages/LabResultPage.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import ProductCategoryPage from "./pages/ProductCategoryPage.jsx";
import ShippingAndReturnPolicyPage from "./pages/ShippingAndReturnPolicyPage.jsx";
import TermsOfServicePage from "./pages/TermsOfServicePage.jsx";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";
import WholeSalePage from "./pages/WholeSalePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

// Admin pages
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminProductForm from "./admin/AdminProductForm.jsx";
import Cart from "./pages/Cart.jsx";

function PublicLayout() {
  const {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      <Header cartCount={cartItems.length} onCartClick={openCart} />
      <Outlet />
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/add" element={<AdminProductForm />} />
      <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/product-category" element={<ProductCategoryPage />} />
        <Route path="/wholesale" element={<WholeSalePage />} />
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/lab-results" element={<LabResultPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route
          path="/shipping-and-returns"
          element={<ShippingAndReturnPolicyPage />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </Router>
  );
}

export default App;
