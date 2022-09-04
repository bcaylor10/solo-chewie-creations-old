import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from '../../../../../mongo/models/Product';

const getHats = () => axios.get('/api/products/hats');
const getHat = (slug: string) => axios.get(`/api/products/hats/${slug}`);

export const useGetHats = () => {
    const result = useQuery(['hats'], getHats);
    return result;
}

export const useGetHatsType = (slug: string) => {
    const { status, data } = useQuery([`hat-${slug}`], async () => await getHat(slug));
    return { status, data }
};