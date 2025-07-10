// App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext"; 
import Layout from "./components/common/layout/Layout";
import HomePage from "./pages/HomePage"; 
import ProductPage from "./pages/ProductPage"; 
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage"; 
import CheckoutPage from "./pages/CheckoutPage"; 
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFound from "./pages/404NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/common/layout/ProtectedRoute";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <WishlistProvider> 
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} /> 
                <Route path="/checkout" element={
                  <Elements stripe={stripePromise}>
                    <CheckoutPage />
                  </Elements>
                } />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/create-listing" element={
                  <ProtectedRoute>
                    <CreateListing />
                  </ProtectedRoute>
                } />
                <Route path="/update-listing/:id" element={
                  <ProtectedRoute>
                    <UpdateListing />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                } />
                <Route path="/search" element={<SearchResultsPage />} />
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