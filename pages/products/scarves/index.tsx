import { useEffect, useState } from "react";

import { IProduct } from "@/mongo/models/Product";
import ProductListLayout from "@/layouts/ProductListLayout";
import { useGetProducts } from "@/queries/products";
import { PRODUCT_TYPES } from "@/helpers";

const HeadBands = () => {
    const [ scarves, setScarves ] = useState<IProduct[]|null>(null);
    const { data, isLoading, status } = useGetProducts(PRODUCT_TYPES.scarf);
    
    useEffect(() => {
        if (status === 'success') setScarves(data?.data);
    }, [ status ]);

    return (
        <ProductListLayout 
            products={scarves}
            isLoading={isLoading}
            productName="scarves" 
        />
    )
};

export default HeadBands;