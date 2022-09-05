import { NextApiRequest, NextApiResponse } from 'next'
import * as sendGrid from '@sendgrid/mail';

import { IContactData } from '@/queries/contact';

// return all hats
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405);

    const { name, email, phone, message }: IContactData = req.body;
    let emailSent = false;

    if (!name || !email || !message) return res.status(422);

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        template_id: 'd-06adc90350f6468b9fa493beb06117a2',
        from: process.env.NEXT_PUBLIC_EMAIL_FROM,
        personalizations: [
            {
                "to":[
                    {
                       "email": process.env.CONTACT_RECEPIENTS
                    }
                ],
                "dynamic_template_data": {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "message": message
                },
            }
        ]
    };

    return sendGrid.send(msg).then(() => {
        return res.status(200).json("Email sent successfully");
    }).catch((err) => {
        return res.status(500).json(`Error sending email: ${err}`);
    });
};

export default handler;