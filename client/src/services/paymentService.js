export const processPayment = async (userId, orderItems, paymentMethodId) => {
    try {
        const response = await fetch("http://localhost:3001/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, orderItems, paymentMethodId }), // Include paymentMethodId
        });

        if (!response.ok) {
            throw new Error("Payment failed");
        }

        return await response.json(); // Returns { clientSecret }
    } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
    }
};
