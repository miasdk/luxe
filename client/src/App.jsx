import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; 
import ProductPage from "./pages/ProductPage"; 
import PaymentForm from "./components/PaymentForm";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentFormWrapper />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route> 
      </Routes>
    </AuthProvider>

  );
}

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QwQtUKwM231sxh5HpiL7QcLaQvsfKUYi2K4sEnCdWYVbT50BmTHoqQc3whyoBI4NRwOd1E2l2QjobSn1vqlhbGK004kKaeVy6");

const PaymentFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
