import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const publicKey = process.env.STRIPE_PUBLIC_KEY;
    const privateKey = process.env.STRIPE_SECRET_KEY;

    if (!publicKey || !privateKey) return res.status(401).json('Unauthorized');

    const stripe = new Stripe(privateKey, {
        apiVersion: '2022-11-15'
    });

    if (req.method === 'POST') {
        const { user_id } = req.body;
        if (!user_id) return res.status(401).json('Unauthorized');

        await stripe.customers.create({ metadata: { user_id: user_id.toString() } })
        .then((customer) => res.status(201).json(customer))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        const { user_id } = req.query;
        if (!user_id) return res.status(401).json('Unauthorized');

        await stripe.customers.search({query: `metadata["user_id"]:"${user_id.toString()}"`})
        .then(({ data }) => res.status(200).json(data[0]))
        .catch((err) => res.status(404).json(err));
    } else {
        return res.status(405).json('Method not allowed');
    }    
};

export default handler;