import { useEffect, useState } from "react";

import { IProduct } from "@/mongo/models/Product";
import ProductListLayout from "@/layouts/ProductListLayout";
import { useGetAllProducts } from "@/queries/products";

const Products = () => {
    const [ products, setProducts ] = useState<IProduct[]|null>(null);
    const { data, isLoading, status } = useGetAllProducts();
    
    useEffect(() => {
        if (status === 'success') setProducts(data?.data);
    }, [ status ]);

    return (
        <ProductListLayout
            products={products} 
            isLoading={isLoading} 
            productName="all products"
            allProducts
        />
    )
};

export default Products;