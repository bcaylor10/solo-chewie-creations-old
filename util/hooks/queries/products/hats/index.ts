import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getHats = () => axios.get('/api/products/hats');
const getHat = (slug: string) => axios.get(`/api/products/hats/${slug}`);

export const useGetHats = () => {
    const query = useQuery(['hats'], getHats);
    return query;
}

export const useGetHat = (slug: string) => {
    const query = useQuery([`hat-${slug}`], async () => await getHat(slug));
    return query;
};