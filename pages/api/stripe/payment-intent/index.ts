import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { withAuth } from 'util/hooks/helpers';
import connect from '@/mongo/index';
import customer from '../customer';
import { Customer } from '@/mongo/models/Customer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.user.uid;
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

    await connect().then(() => Customer.find({ user_id: userId }))
    .then((data) => {
        if (data.length === 0) {
            throw new Error('Customer not found');
        }
    })
    .then(() => stripe.paymentIntents.create({
        amount: parseFloat(amount.toString()) * 100,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        customer: customer_id.toString()
    }))
    .then((paymentIntent) => res.status(201).json({
        publishable_key: publicKey,
        client_secret: paymentIntent.client_secret
    }))
    .catch((err) => {
        if (err === 'Error: Customer not found') {
            return res.status(404).json(err);
        } else {
            return res.status(500).json(err)
        }
    });
};

export default withAuth(handler);