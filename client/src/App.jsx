// App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; 
import ProductPage from "./pages/ProductPage"; 
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage"; // New import
import CheckoutPage from "./pages/CheckoutPage"; // New import
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // New import
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/404NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key - this is different from your secret key!
const stripePromise = loadStripe("pk_test_51QwQtUKwM231sxh5HpiL7QcLaQvsfKUYi2K4sEnCdWYVbT50BmTHoqQc3whyoBI4NRwOd1E2l2QjobSn1vqlhbGK004kKaeVy6");

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} /> {/* New route */}
              <Route path="/checkout" element={
                <Elements stripe={stripePromise}>
                  <CheckoutPage />
                </Elements>
              } /> {/* New route */}
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} /> {/* New route */}
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/update-listing/:id" element={<UpdateListing />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;