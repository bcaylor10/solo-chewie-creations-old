import { NextApiRequest, NextApiResponse } from 'next';

import { verifyUser } from '@/helpers';
import connect from 'mongo';
import { Product } from 'mongo/models/Product';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET' || req.method === 'PATCH') {
        return res.status(405).json('Method not allowed');
    }
    const authToken = req.headers.authorization;
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!authToken || !adminEmails || adminEmails.length === 0) {
        return res.status(401).json('Unauthorized');
    }

    if (req.method === 'DELETE') {
        const { userId, id } = req.query;

        if (!userId) return res.status(401).json('Unauthorized');
        if (!id) return res.status(404);

        await verifyUser(res, authToken, userId, adminEmails);

        // @ts-ignore
        await connect().then(() => Product.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { userId, product } = req.body;

        if (!userId) return res.status(401).json('Unauthorized');
        if (!id) return res.status(404);

        await verifyUser(res, authToken, userId, adminEmails);

        const data = mapToModelData(product, true);

        await connect().then(() => {
            return Product.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'POST') {
        const { userId, product } = req.body;

        console.log(userId, product);

        if (!userId) return res.status(401).json('Unauthorized');

        await verifyUser(res, authToken, userId, adminEmails);

        const data = mapToModelData(product, true);

        await connect().then(() => {
            return Product.create(data);
        })
        .then(({ data }) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).end();
    }       
};

const mapToModelData = (data: any, isUpdate = false) => {
    const currentDate = new Date().toISOString();

    const mappedData: any = {
        name: data.name,
        description: data.description,
        product_type: data.product_type,
        size: data.size,
        labor_hours: data.labor_hours,
        price: data.price,
        promos: data.promos,
        img_urls: data.img_urls,
        updated_at: isUpdate ? currentDate : null,
        extras: {
            care: data.care,
            details: data.details,
            featured: data.featured
        }
    };

    if (!isUpdate) mappedData.created_at = currentDate;

    return mappedData;
};

export default handler;