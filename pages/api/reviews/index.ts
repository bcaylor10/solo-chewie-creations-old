import { NextApiRequest, NextApiResponse } from 'next'

import connect from 'mongo';
import { Review, IReview } from 'mongo/models/Review';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).end();
    
    let featured: IReview[] = [];

    await connect().then(() => {
        // @ts-ignore
        return Review.find();
    }).then((data: IReview[] | []) => {
        featured = data;
    }).catch((error) => {
        res.status(500).json({ error });
    });

    res.status(200).json(featured)
};

export default handler;