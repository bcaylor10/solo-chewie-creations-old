import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getScarves = () => axios.get('/api/products/scarves');
const getScarf = (slug: string) => axios.get(`/api/products/scarves/${slug}`);

export const useGetScarves = () => {
    const query = useQuery(['scarves'], getScarves);
    return query;
}

export const useGetScarf = (slug: string) => {
    const query = useQuery([`scarf-${slug}`], async () => await getScarf(slug));
    return query;
};