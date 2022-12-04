import { NextApiRequest, NextApiResponse } from 'next';
import { forEach } from 'lodash';
// @ts-ignore
import formidable from 'formidable-serverless';
import fs from 'fs';

import { verifyUserToken } from '@/helpers';
import { s3, baseParams } from 'util/aws';

export const config = {
    api: {
      bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json('Method not allowed');

    const authToken = req.headers.authorization;
    const { userId } = req.query;
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');

    if (!authToken || !userId || !adminEmails || adminEmails.length === 0) {
        return res.status(401).json('Unauthorized');
    }

    const verified = await verifyUserToken(userId.toString(), authToken);

    if (!verified) return res.status(401).json('Unauthorized');
    // @ts-ignore
    if (!adminEmails.includes(verified.email)) return res.status(401).json('Unauthorized');

    const { images }: any = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            multiples: true
        });

        form.parse(req, async (err: any, fields: any, files: any) => {
            if (err) reject(err);
            resolve(files);
        });
    });
    
    if (images instanceof Array) {
        await forEach(images, (img) => uploadToS3(img, res));
    } else {
        await uploadToS3(images, res)
    }
    
    return res.status(200).json('Successfully uploaded images');
};

const uploadToS3 = (img: any, res: any) => {
    const params = {
        ...baseParams,
        Key: img.name,
        Body: fs.createReadStream(img.path),
    };

    // @ts-ignore
    s3.putObject(params, (err) => {
        if (err) return res.status(500).json(err);
    });
}

export default handler;