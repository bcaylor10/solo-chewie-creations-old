import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

import connect from 'mongo';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return getReviews(res);
        case 'POST':
            return createReview(req, res);
        default:
            return res.status(405).end(`Method ${req.method} not allowed`);
    }
};

const getReviews = async (res: NextApiResponse) => {
    // let reviews: IReview[] = [];

    // await connect().then(() => {
    //     // @ts-ignore
    //     return Review.find();
    // }).then((data: IReview[] | []) => {
    //     reviews = data;
    // }).catch((error) => {
    //     res.status(500).json({ error });
    // })
    // .finally(() => mongoose.connection.close());

    // res.status(200).json(reviews)
};

const createReview = (req: NextApiRequest, res: NextApiResponse) => {

}

export default handler;