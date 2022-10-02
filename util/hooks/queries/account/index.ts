import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface IAuthedRequest {
    userId: string;
    token: string;
    data?: any;
}

const getAdminUser = ({ token, userId }: IAuthedRequest) => axios.get('/api/admin', {
    headers: {
        'Authorization': token
    },
    params: { userId: userId },
    withCredentials: true
});

export const useGetAdminUser = () => {
    const query = useMutation(getAdminUser, {
        onSuccess: (data) => {
            return data?.data
        }
    });
    return query;
};