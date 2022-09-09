import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PRODUCT_TYPES } from "@/helpers";

const getScarves = () => axios.get('/api/products', { params: { type: PRODUCT_TYPES.scarf } });
const getScarf = (size: string) => axios.get(`/api/products`, { params: {
    type: PRODUCT_TYPES.scarf,
    size
} });

export const useGetScarves = () => {
    const query = useQuery(['scarves'], getScarves);
    return query;
}

export const useGetScarf = (size: string) => {
    const query = useQuery([`scarf-${size}`], async () => await getScarf(size));
    return query;
};