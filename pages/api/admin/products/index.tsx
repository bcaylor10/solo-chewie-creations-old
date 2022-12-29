import { NextApiRequest, NextApiResponse } from 'next';

import connect from 'mongo';
import { Product } from 'mongo/models/Product';
import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET' || req.method === 'PATCH') {
        return res.status(405).json('Method not allowed');
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) return res.status(404);

        // @ts-ignore
        await connect().then(() => Product.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { product } = req.body;

        if (!id) return res.status(404);

        const data = mapToModelData(product, true);

        await connect().then(() => {
            return Product.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'POST') {
        const { product } = req.body;

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

export default withAuth(handler, true);