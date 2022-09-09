import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PRODUCT_TYPES } from "@/helpers";

const getHats = () => axios.get('/api/products', { params: { type: PRODUCT_TYPES.hat } });
const getHat = (size: string) => axios.get(`/api/products`, { params: {
    type: PRODUCT_TYPES.hat,
    size
} });

export const useGetHats = () => {
    const query = useQuery(['hats'], getHats);
    return query;
}

export const useGetHat = (size: string) => {
    const query = useQuery([`hat-${size}`], async () => await getHat(size));
    return query;
};