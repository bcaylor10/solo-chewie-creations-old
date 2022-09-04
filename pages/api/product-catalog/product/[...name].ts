import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405);
    res.status(200).json(req.toString())
};

export default handler;