import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const getCart = (token: string) => axios.get('/api/cart', {
    headers: {
        'Authorization': token
    },
    withCredentials: true
});

export const useGetCart = () => useMutation(getCart, {
    onSuccess: (data) => data?.data
});