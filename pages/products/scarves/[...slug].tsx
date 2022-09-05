import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IProduct } from "@/mongo/models/Product";
import ProductLayout from "@/layouts/ProductLayout";
import { useGetScarf } from "@/queries/products/scarves";

const ScarfProduct = () => {
    const [ scarf, setScarf ] = useState<IProduct|null>(null);
    const router = useRouter();
    // @ts-ignore
    const { data, isLoading, status } = useGetScarf(router.query.slug?.toString());

    useEffect(() => {        
        if (status === 'success') setScarf(data?.data[0]);
    }, [ status ]);

    return (
        <ProductLayout product={scarf} isLoading={isLoading} />
    )
};

export default ScarfProduct;