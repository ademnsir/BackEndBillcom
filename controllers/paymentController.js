const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key

exports.createCheckoutSession = async (req, res) => {
    try {
        const { items, address } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: "Items must be provided as an array" });
        }

        const line_items = items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description || 'No description', // Fallback if description is missing
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
            success_url: 'https://techgadgetstn.netlify.app/store?type=all',
            cancel_url: 'http://localhost:3000/paymentFailed',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'FR'],
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
