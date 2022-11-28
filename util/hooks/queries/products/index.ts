import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { PRODUCT_TYPES } from "@/helpers";
import { IAuthedRequest } from "../account";

const getProduct = (type: number, size: string) => axios.get(`/api/products`, { 
    params: {
        type: type,
        size: size
    } 
});
const getProducts = (type: number) => axios.get('/api/products', { params: { type: type } });
const getAllProducts = () => axios.get('/api/products');
const getProductSizes = (type: number) => axios.get('/api/products/sizes', { params: { type: type } })
const getFeaturedProducts = () => axios.get('/api/products/featured');
const deleteProduct = ({ userId, token, data }: IAuthedRequest) => axios.delete(`/api/admin/products?id=${data.id}`, {
    headers: {
        'Authorization': token,
    },
    params: {
        userId
    },
    withCredentials: true
});
const createProduct = ({ userId, token, data }: IAuthedRequest) => axios.post(`/api/admin/products`, {
    data,
    headers: {
        'Authorization': token,
    },
    params: {
        userId
    },
    withCredentials: true
});
const updateProduct = ({ userId, token, data }: IAuthedRequest) => axios.put(`/api/admin/products?id=${data.id}`,
    {
        userId,
        product: data.productData
    },
    {
        headers: {
            'Authorization': token
        },
        withCredentials: true,
    }
);

export const useGetProducts = (type: number) => {
    const query = useQuery([`products-${type}`], async () => await getProducts(type));
    return query;
};

export const useGetAllProducts = () => {
    const query = useQuery([`all-products`], async () => await getAllProducts());
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

export const useGetProduct = (type: string, size: string) => {
    let productType: number = 0;
    let queryName: string = '';

    switch (type) {
        case 'scarves':
            productType = PRODUCT_TYPES.scarf;
            queryName = `scarf-${size}`;
            break;
        case 'hats':
            productType = PRODUCT_TYPES.hat;
            queryName = `hat-${size}`;
            break;
        case 'head-bands':
            productType = PRODUCT_TYPES.headBand;
            queryName = `head-band-${size}`;
            break;
    }

    return useQuery(
        [ queryName ],
        async () => await getProduct(productType, size) 
    );
};

export const useDeleteProduct = () => useMutation(deleteProduct);
export const useCreateProduct = () => useMutation(createProduct);
export const useUpdateProduct = () => useMutation(updateProduct);