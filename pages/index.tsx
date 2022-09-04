import { useEffect, useState } from "react";
import { NextPage } from "next/types";

import BaseLayout from "layouts/BaseLayout";
import { IProduct } from "@/mongo/models/Product";
import { request } from "util/helpers";

const Home: NextPage = () => {
    const [ hats, setHats ] = useState<IProduct[]>([]);

    useEffect(() => {
        request('/api/product-catalog/hat')
        .then(({ data }) => setHats(data))
        .catch((err) => console.log(err));
    }, []);

    console.log(hats)

    return (
        <BaseLayout>
        </BaseLayout>
    )
};

export default Home;