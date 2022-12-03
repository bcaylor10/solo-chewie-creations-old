import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(403).end("Method not allowed");

    const { amount, customer_id } = req.query;
    const publicKey = process.env.STRIPE_PUBLIC_KEY;
    const privateKey = process.env.STRIPE_SECRET_KEY;

    if (!publicKey || !privateKey || !amount || !customer_id) {
        return res.status(401).json('Unauthorized');
    }
    
    const stripe = new Stripe(privateKey, {
        apiVersion: '2022-11-15'
    });

    // stripe.paymentIntents.create

    // TODO: check if it's the current user

    await stripe.paymentIntents.create({
        amount: parseFloat(amount.toString()) * 100,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        customer: customer_id.toString()
    })
    .then((paymentIntent) => res.status(201).json({
        publishable_key: publicKey,
        client_secret: paymentIntent.client_secret
    }))
    .catch((err) => res.status(500).json(err));
};

export default handler;