import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IAuthedRequest } from "../account";

export const uploadImages = ({ userId, token, data }: IAuthedRequest) => axios.post(`/api/admin/images?userId=${userId}`, 
    data,
    { 
        headers: {
            'Authorization': token,
        },
        withCredentials: true
    }
);

const getAllPromos = ({ userId, token }: IAuthedRequest) => axios.get(`/api/admin/promos`, 
    { 
        headers: {
            'Authorization': token
        },
        params: { userId },
        withCredentials: true
    }
);

export const useGetAllPromos = () => useMutation(getAllPromos, {
    onSuccess: (data) => data?.data
});