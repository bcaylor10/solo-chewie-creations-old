import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getFeaturedProducts = () => axios.get('/api/products/featured');

export const useFeaturedProducts = () => {
    const { status, data, isLoading } = useQuery(['featured'], getFeaturedProducts);
    return { status, data, isLoading };
}