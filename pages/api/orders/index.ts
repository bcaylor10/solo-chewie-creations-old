import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Order } from '@/mongo/models/Order';

// return all products of a certain type
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const data = {
            ...req.body,
            created_at: new Date().toISOString()
        }

        await connect().then(() => Order.create(data))
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        const { userId, status } = req.query;

        if (!userId) return res.status(500).end();

        const query: any = {
            user_id: userId?.toString()
        };

        if (status) {
            query.status = status.toString();
        }
        
        await connect().then(() => Order.find(query))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        res.status(405).json('Method not allowed');
    }
};

export default handler;