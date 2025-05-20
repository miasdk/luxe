// App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext"; // Add this import
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; 
import ProductPage from "./pages/ProductPage"; 
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage"; 
import CheckoutPage from "./pages/CheckoutPage"; 
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import WishlistPage from "./pages/WishlistPage"; // Add this import
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import NotFound from "./pages/404NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QwQtUKwM231sxh5HpiL7QcLaQvsfKUYi2K4sEnCdWYVbT50BmTHoqQc3whyoBI4NRwOd1E2l2QjobSn1vqlhbGK004kKaeVy6");

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <WishlistProvider> {/* Add WishlistProvider */}
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} /> {/* Add wishlist route */}
                <Route path="/checkout" element={
                  <Elements stripe={stripePromise}>
                    <CheckoutPage />
                  </Elements>
                } />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/update-listing/:id" element={<UpdateListing />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Route>
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </WishlistProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;