import { useRouter } from "next/router";

const ViewProduct = () => {
    const router = useRouter();
    // @ts-ignore
    // const { data, isLoading, status } = useGetHat(router.query.slug?.toString());

    return (
        <h1>View Product</h1>
    )
};

export default ViewProduct;