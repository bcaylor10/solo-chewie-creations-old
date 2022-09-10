import { useEffect, useState } from "react";

import { IProduct } from "@/mongo/models/Product";
import ProductListLayout from "@/layouts/ProductListLayout";
import { useGetProducts } from "@/queries/products";
import { PRODUCT_TYPES } from "@/helpers";

const Hats = () => {
    const [ hats, setHats ] = useState<IProduct[]|null>(null);
    const { data, isLoading, status } = useGetProducts(PRODUCT_TYPES.hat);
    
    useEffect(() => {
        if (status === 'success') setHats(data?.data);
    }, [ status ]);

    return (
        <ProductListLayout 
            products={hats} 
            isLoading={isLoading} 
            productName="hats" 
        />
    )
};

export default Hats;