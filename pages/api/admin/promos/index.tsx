import { NextApiRequest, NextApiResponse } from 'next';

import connect from 'mongo';
import { Promo } from 'mongo/models/Promo';
import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') return res.status(405).json('Method not allowed');

    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) return res.status(404);

        // @ts-ignore
        await connect().then(() => Promo.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { promo } = req.body;

        if (!id) return res.status(404);

        const data = mapToModelData(promo, true);

        await connect().then(() => {
            return Promo.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'POST') {
        const { promo } = req.body;

        const data = mapToModelData(promo);

        await connect().then(() => {
            return Promo.create(data);
        })
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        await connect().then(() => Promo.find({}))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).json("Method not allowed");
    }
};

const mapToModelData = (data: any, isUpdate = false) => {
    const currentDate = new Date().toISOString();

    const mappedData = {
        ...data,
        code: data.code.toUpperCase(),
        type: parseInt(data.type),
        start_date: new Date(data.start_date).toISOString(),
        expiration_date: data.expiration_date && new Date(data.expiration_date).toISOString(),
        updated_at: isUpdate ? currentDate : null,
    }

    if (!isUpdate) mappedData.created_at = currentDate;

    return mappedData;
}

export default withAuth(handler, true);