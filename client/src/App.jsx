import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // ✅ Import HomePage
import ProductPage from "./pages/ProductPage"; // ✅ Import ProductPage
import PaymentForm from "./components/PaymentForm"; // ✅ Import PaymentForm

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/products" element={<ProductPage />} /> {/* ✅ Route for ProductPage */}
      <Route path="/payment" element={<PaymentFormWrapper />} /> {/* ✅ Route for PaymentForm */}
    </Routes>
  );
}

// ✅ Wrap PaymentForm inside Elements
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QwQtUKwM231sxh5HpiL7QcLaQvsfKUYi2K4sEnCdWYVbT50BmTHoqQc3whyoBI4NRwOd1E2l2QjobSn1vqlhbGK004kKaeVy6");

const PaymentFormWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default App;
