import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IAuthedRequest } from '..';


const getAddresses = ({ userId, token }: IAuthedRequest) => axios.get('/api/address', 
    { 
        headers: {
            'Authorization': token
        },
        params: { userId: userId },
        withCredentials: true
    }
);

const createAddress = ({ userId, token, address }: IAuthedRequest) => axios.post('/api/address', 
    {
        userId: userId,
        address: address
    },
    {
        headers: {
            'Authorization': token
        },
        withCredentials: true,
    }
);

const deleteAddress = ({ userId, token, address }: IAuthedRequest) => axios.delete(`/api/address/${address?._id}`, 
    {
        headers: {
            'Authorization': token
        },
        params: {
            userId: userId
        },
        withCredentials: true,
    }
);

const updateAddress = ({ userId, token, address }: IAuthedRequest) => axios.put(`/api/address/${address?._id}`, 
    {
        userId: userId,
        address: address
    },
    {
        headers: {
            'Authorization': token
        },
        withCredentials: true,
    }
);

const getDefaultAddress = ({ userId, token }: IAuthedRequest) => axios.get('/api/address/default', 
    { 
        headers: {
            'Authorization': token
        },
        params: { userId: userId },
        withCredentials: true
    }
);

// hooks

export const useGetAddresses = () => {
    const query = useMutation(getAddresses, {
        onSuccess: (data) => {
            return data?.data
        }
    });
    return query;
};

export const useCreateAddress = () => useMutation(createAddress);
export const useDeleteAddress = () => useMutation(deleteAddress);
export const useUpdateAddress = () => useMutation(updateAddress);
export const useGetDefaultAddress = () => {
    const query = useMutation(getDefaultAddress, {
        onSuccess: (data) => {
            return data?.data
        }
    });
    return query;
};