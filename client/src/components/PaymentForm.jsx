// components/PaymentForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { API_BASE_URL } from "../config/constants"; // Make sure you have this file

const PaymentForm = ({ userId, orderItems, shippingInfo, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        if (!userId || !orderItems || orderItems.length === 0) {
            setErrorMessage("Invalid order data");
            return;
        }
        
        for (const [key, value] of Object.entries(shippingInfo)) {
            if (!value) {
                setErrorMessage(`Please fill in your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }
    
        setLoading(true);
        setErrorMessage("");
    
        try {
            // Step 1: Create an order and get clientSecret
            const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    orderItems,
                    shippingInfo
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create order");
            }
    
            const { order, clientSecret } = await response.json();
    
            // Step 2: Confirm payment with Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });
    
            if (error) {
                throw new Error(error.message);
            }
    
            // Step 3: Send stripePaymentId to backend to update order status
            const updateResponse = await fetch(`${API_BASE_URL}/api/orders/${order.id}/update-payment`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stripePaymentId: paymentIntent.id }),
            });
            
            if (!updateResponse.ok) {
                throw new Error("Payment confirmed but failed to update order");
            }
    
            // Notify parent component of success
            onPaymentSuccess(order.id);
        } catch (error) {
            setErrorMessage(error.message || "Payment processing error");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                    Card Details
                </label>
                <div className="p-3 border rounded-md bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>
            </div>
            
            {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Complete Order"}
            </button>
        </form>
    );
};

export default PaymentForm;