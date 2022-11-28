import { Table, Button } from "@mantine/core";
import { useRouter } from "next/router";

import { useGetAllProducts } from "@/queries/products";
import Loader from "@/components/Loader";
import { IProduct } from '@/mongo/models/Product';
import { buildProductUrl } from "@/helpers";

const Products = () => {
    const { data, isLoading } = useGetAllProducts();
    const router = useRouter();

    // TODO: make this not static :)
    const renderProductType = (type: number): string => {
        let typeString: string = '';

        switch (type) {
            case 0: 
                typeString = 'Hat';
                break;
            case 1: 
                typeString = 'Scarf';
                break;
            case 2: 
                typeString = 'Head Band';
                break;
        };

        return typeString;
    }

    return (
        <>
            <Button 
                onClick={() => router.push('/admin/products/create')}
                color="green"
                style={{ marginBottom: '20px' }}
            >
                Create Product
            </Button>
            <Loader loading={isLoading} />
            <Table highlightOnHover verticalSpacing="md">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Labor Hours</th>
                        <th>Product Type</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data && data.data.map((d: IProduct, i: number) => {
                        const url = `/admin${buildProductUrl(d)}`;

                        return (
                            <tr onClick={() => router.push(url)} role="link" key={i} style={{ cursor: 'pointer' }}>
                                <td>{d.name}</td>
                                <td>{d.size}</td>
                                <td>{d.labor_hours}</td>
                                <td>{renderProductType(d.product_type)}</td>
                                <td>{d.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
};

export default Products;