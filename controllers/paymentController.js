const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key

exports.createCheckoutSession = async (req, res) => {
    try {
        const { items, address } = req.body;

        const line_items = items.map(item => {
            return {
                price_data: {
                    currency: 'usd', // Use your currency
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: [item.image], // Use the product's image
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe accepts amount in cents
                },
                quantity: item.quantity,
            };
        });

        // Create the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Only card payments
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:3000/paymentSucces', // Define your success URL
            cancel_url: 'http://localhost:3000/paymentFailed', // Define your cancel URL
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'FR'], // Example list of countries
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 4700, currency: 'usd' }, // Shipping price in cents
                        display_name: 'Standard Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
                    },
                },
            ],
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Something went wrong creating the payment session' });
    }
};
