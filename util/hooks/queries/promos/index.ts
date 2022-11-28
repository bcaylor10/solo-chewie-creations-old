import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

import { IAuthedRequest } from "../account";

const getPromo = (code: string) => axios.get('/api/promos', { params: { code } });

export const useGetPromo = () => useMutation(getPromo, {
    onSuccess: (data) => data
});

const deletePromo = ({ userId, token, data }: IAuthedRequest) => axios.delete(`/api/admin/promos?id=${data.id}`, {
    headers: {
        'Authorization': token,
    },
    params: {
        userId
    },
    withCredentials: true
});

const updatePromo = ({ userId, token, data }: IAuthedRequest) => axios.put(`/api/admin/promos?id=${data.id}`,
    {
        userId,
        promo: data.promoData
    },
    {
        headers: {
            'Authorization': token
        },
        withCredentials: true,
    }
);

const createPromo = ({ userId, token, data }: IAuthedRequest) => axios.post(`/api/admin/promos`, {
    data,
    headers: {
        'Authorization': token,
    },
    params: {
        userId,
    },
    withCredentials: true
});

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
export const useDeletePromo = () => useMutation(deletePromo);
export const useCreatePromo = () => useMutation(createPromo);
export const useUpdatePromo = () => useMutation(updatePromo);