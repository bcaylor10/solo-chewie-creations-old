import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface IAuthedRequest {
    userId: string;
    token: string;
}

const getAddresses = ({ userId, token }: IAuthedRequest) => axios.get('/api/address', 
    { 
        headers: {
            'Authorization': token
        },
        params: { userId: userId },
        withCredentials: true
    }
);

export const useGetAddresses = () => {
    const query = useMutation(getAddresses, {
        onSuccess: (data) => {
            return data?.data
        }
    });
    return query;
}