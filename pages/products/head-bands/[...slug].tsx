import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IProduct } from "@/mongo/models/Product";
import ProductLayout from "@/layouts/ProductLayout";
import { useGetHeadBand } from "@/queries/products/head-bands";

const HeadBandProduct = () => {
    const [ headBand, setHeadBand ] = useState<IProduct|null>(null);
    const router = useRouter();
    // @ts-ignore
    const { data, isLoading, status } = useGetHeadBand(router.query.slug?.toString());

    useEffect(() => {        
        if (status === 'success') setHeadBand(data?.data[0]);
    }, [ status ]);

    return (
        <ProductLayout product={headBand} isLoading={isLoading} />
    )
};

export default HeadBandProduct;