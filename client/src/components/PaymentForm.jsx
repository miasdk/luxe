import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
    
        setLoading(true);
        setErrorMessage("");
    
        try {
            // Request the client secret from the backend
            const response = await fetch("http://localhost:3001/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: 1,
                    orderItems: [
                        { productId: 101, quantity: 1, unitPrice: 349.99 },
                        { productId: 102, quantity: 2, unitPrice: 99.99 },
                    ],
                }),
            });
    
            const { clientSecret } = await response.json();
    
            if (!clientSecret) throw new Error("Failed to get client secret.");
    
            // Confirm payment using Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
    
            if (error) {
                console.error("Stripe Payment Error:", error);
                setErrorMessage(error.message);
                setLoading(false);
                return;
            }
    
            if (paymentIntent.status === "succeeded") {
                alert("Payment Successful & Order Created!");
            } else {
                setErrorMessage("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="max-w-md mt-5 mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="mb-4 mx-auto w-64">
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
            {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default PaymentForm;
