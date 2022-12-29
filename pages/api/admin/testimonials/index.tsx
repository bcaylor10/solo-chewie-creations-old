import { NextApiRequest, NextApiResponse } from 'next';

import connect from 'mongo';
import { Testimonial } from 'mongo/models/Testimonial';
import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') return res.status(405).json('Method not allowed');

    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) return res.status(404);

        // @ts-ignore
        await connect().then(() => Testimonial.findByIdAndDelete(id))
        .then(() => res.status(200).end())
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { testimonial } = req.body;

        if (!id) return res.status(404);

        const data = mapToModelData(testimonial, true);

        await connect().then(() => {
            return Testimonial.findByIdAndUpdate(id, data);
        })
        .then(({ data }) => res.status(200).json(data))
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    } else if (req.method === 'POST') {
        const { testimonial } = req.body;
        const data = mapToModelData(testimonial);

        await connect().then(() => {
            return Testimonial.create(data);
        })
        .then((data) => res.status(201).json(data))
        .catch((err) => res.status(500).json(err));
    } else if (req.method === 'GET') {
        await connect().then(() => Testimonial.find({}))
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    } else {
        return res.status(405).end();
    }
};

const mapToModelData = (data: any, isUpdate = false) => {
    const currentDate = new Date().toISOString();

    const mappedData = {
        ...data,
        updated_at: isUpdate ? currentDate : null,
    }

    if (!isUpdate) mappedData.created_at = currentDate;

    return mappedData;
}

export default withAuth(handler, true);