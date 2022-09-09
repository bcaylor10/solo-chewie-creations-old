import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProducts = (type: number) => axios.get('/api/products', { params: { type: type } });
const getProductSizes = (type: number) => axios.get('/api/products/sizes', { params: { type: type } })
const getFeaturedProducts = () => axios.get('/api/products/featured');

export const useGetProducts = (type: number) => {
    const query = useQuery([`products-${type}`], async () => await getProducts(type));
    return query;
};

export const useGetSizesForProduct = (type: number) => {
    const query = useQuery([`product-${type}-sizes`], async () => await getProductSizes(type));
    return query;
}

export const useFeaturedProducts = () => {
    const query = useQuery(['featured'], getFeaturedProducts);
    return query;
}