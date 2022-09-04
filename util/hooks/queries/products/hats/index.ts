import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from '@/mongo/models/Product';

const getHats = () => axios.get('/api/products/hats');
const getHat = (slug: string) => axios.get(`/api/products/hats/${slug}`);

export const useGetHats = () => {
    const { status, data, isLoading } = useQuery(['hats'], getHats);
    return { status, data, isLoading };
}

export const useGetHatsType = (slug: string) => {
    const { status, data, isLoading } = useQuery([`hat-${slug}`], async () => await getHat(slug));
    return { status, data, isLoading };
};