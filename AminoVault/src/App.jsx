import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Import all pages
import HomePage from "./pages/HomePage.jsx";
import Shoppage from "./pages/Shoppage.jsx";
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

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQsPage />} />

        {/* Shop Related */}
        <Route path="/product-category" element={<ProductCategoryPage />} />
        <Route path="/wholesale" element={<WholeSalePage />} />

        {/* Account & Orders */}
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/lab-results" element={<LabResultPage />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route
          path="/shipping-and-returns"
          element={<ShippingAndReturnPolicyPage />}
        />

        {/* You can add more specific routes later (e.g. /shop/:category, /product/:id, etc.) */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
