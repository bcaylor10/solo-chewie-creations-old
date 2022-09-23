import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

const getPromo = (code: string) => axios.get('/api/promos', { params: { code } });

export const useGetPromo = () => useMutation(getPromo, {
    onSuccess: (data) => data
})