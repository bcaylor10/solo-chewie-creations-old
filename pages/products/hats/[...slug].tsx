import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IProduct } from "@/mongo/models/Product";
import ProductLayout from "@/layouts/ProductLayout";
import { useGetHat } from "@/queries/products/hats";

const HatProduct = () => {
    const [ hat, setHat ] = useState<IProduct|null>(null);
    const router = useRouter();
    // @ts-ignore
    const { data, isLoading, status } = useGetHat(router.query.slug?.toString());

    useEffect(() => {        
        if (status === 'success') setHat(data?.data[0]);
    }, [ status ]);


    return (
        <ProductLayout product={hat} isLoading={isLoading} />
    )
};

export default HatProduct;