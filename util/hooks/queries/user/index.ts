import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { IUser } from "@/redux/user";
import { API_URL } from '@/layouts/BaseLayout';

const USERS_URL = `${API_URL}/users`;

interface IUpdate {
    id: string | undefined;
    data: IUser;
    token: string;
}

const updateUser = ({ id, data, token }: IUpdate) => axios.patch(`${USERS_URL}/${id}`, data, {
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export const useUpdateUser = () => useMutation(updateUser);