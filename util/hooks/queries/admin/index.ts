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