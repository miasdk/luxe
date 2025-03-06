/**
 * PaymentService.js handles all Stripe-related operations and payment logic. 
 */
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

class PaymentService{
    /**
     * Processes a payment using Stripe PaymentIntent 
     * @param {number} totalPrice - The total price of the order
     * @param {string} paymentMethodId - The ID of the payment method from the frontend 
     * @returns {Promise<Object>} - Stripe PaymentIntent object
     */
    static async processPayment (totalPrice, paymentMethodId) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalPrice * 100), // Convert to cents
                currency: 'usd',
                payment_method: paymentMethodId,
                confirm: true,
            });

            if (paymentIntent.status !== 'succeeded') {
                throw new Error('Payment failed');
            }

            return paymentIntent;
        } catch (error) {
            console.error("PaymentService.processPayment(): Error:", error.message);
            throw new Error("Payment processing failed: " + error.message);
        }
    }
}
export default PaymentService; 