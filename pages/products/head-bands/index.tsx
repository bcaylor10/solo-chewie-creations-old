import { useEffect, useState } from "react";

import { IProduct } from "@/mongo/models/Product";
import ProductListLayout from "@/layouts/ProductListLayout";
import { useGetProducts } from "@/queries/products";
import { PRODUCT_TYPES } from "@/helpers";

const HeadBands = () => {
    const [ headBands, setHeadBands ] = useState<IProduct[]|null>(null);
    const { data, isLoading, status } = useGetProducts(PRODUCT_TYPES.headBand);
    
    useEffect(() => {
        if (status === 'success') setHeadBands(data?.data);
    }, [ status ]);

    return (
        <ProductListLayout
            productType={PRODUCT_TYPES.headBand}
            products={headBands} 
            isLoading={isLoading} 
            productName="head bands" 
        />
    )
};

export default HeadBands;