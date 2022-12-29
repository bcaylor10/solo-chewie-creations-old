import { NextApiRequest, NextApiResponse } from 'next';

import { withAuth } from 'util/hooks/helpers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json('Method not allowed');

    return res.status(200).json(req.user);
};

export default withAuth(handler);