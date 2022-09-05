import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface IContactData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

const sendContactEmail = (data: IContactData) => axios.post('/api/contact', data);

export const useSendEmail = () => {
    const mutation = useMutation(sendContactEmail);
    return mutation;
}