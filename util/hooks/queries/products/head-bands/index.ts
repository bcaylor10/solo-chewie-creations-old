import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PRODUCT_TYPES } from "@/helpers";

const getHeadBands = () => axios.get('/api/products', { params: { type: PRODUCT_TYPES.headBand }});
const getHeadBand = (size: string) => axios.get(`/api/products`, { params: {
    type: PRODUCT_TYPES.headBand,
    size
} });

export const useGetHeadBands = () => {
    const query = useQuery(['head-bands'], getHeadBands);
    return query;
}

export const useGetHeadBand = (size: string) => {
    const query = useQuery([`head-band-${size}`], async () => await getHeadBand(size));
    return query;
};