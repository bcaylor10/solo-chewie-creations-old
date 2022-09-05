import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getHeadBands = () => axios.get('/api/products/head-bands');
const getHeadBand = (slug: string) => axios.get(`/api/products/head-bands/${slug}`);

export const useGetHeadBands = () => {
    const query = useQuery(['head-bands'], getHeadBands);
    return query;
}

export const useGetHeadBand = (slug: string) => {
    const query = useQuery([`head-band-${slug}`], async () => await getHeadBand(slug));
    return query;
};