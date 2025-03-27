import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {
    // Create a PaymentIntent without confirming it
    static async createPaymentIntent(totalPrice) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalPrice * 100), // Convert to cents
                currency: "usd",
                automatic_payment_methods: { enabled: true }
            });

            console.log("✅ Stripe PaymentIntent Created:", paymentIntent);

            return {
                clientSecret: paymentIntent.client_secret,
                stripePaymentId: paymentIntent.id
            };
        } catch (error) {
            console.error("❌ PaymentService.createPaymentIntent(): Error:", error.message);
            throw new Error("Payment processing failed: " + error.message);
        }
    }
}

export default PaymentService;
