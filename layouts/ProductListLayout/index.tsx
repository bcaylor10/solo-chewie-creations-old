import { useState, useEffect } from 'react';
import { Container, Center, Loader, Grid, Title } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';

import { IProduct } from '@/mongo/models/Product';
import ProductListSidebar from './ProductListSidebar';
import ProductListItem from './ProductListItem';
import { orderProducts, filterProductsByName, filterProductsBySize } from '@/helpers';
import { useGetSizesForProduct } from '@/queries/products';

import styles from './styles.module.scss';
interface IProductListLayout {
    productType?: number;
    products: IProduct[] | null;
    productName: string;
    isLoading: boolean;
    allProducts?: boolean;
}

const ProductListLayout = ({ productType = -1, products, productName, isLoading, allProducts = false }: IProductListLayout) => {
    const queryClient = useQueryClient();
    const [ orderBy, setOrderBy ] = useState<string>('updatedAt');
    const [ collection, setCollection ] = useState<string>('all');
    const [ size, setSize ] = useState<string>('all');
    const [ filteredProducts, setFilteredProducts ] = useState<IProduct[]>([]);
    const { data: sizes, isLoading: sizeLoading } = useGetSizesForProduct(productType);

    if (productType === -1) queryClient.cancelQueries([`product-${productType}-sizes`]);

    const filterProducts = (products: IProduct[]) => {
        let ordered: IProduct[] = products;

        ordered = orderProducts(orderBy, ordered);
        ordered = filterProductsByName(collection, ordered);
        ordered = filterProductsBySize(size, ordered);        

        setFilteredProducts(ordered);
    }

    useEffect(() => {
        if (products && products.length > 0) {
            filterProducts(products)
        }
    }, [ products, orderBy, collection, size ]);
    
    return (
        <section className={styles.productListLayout}>
            <Container size="lg">
                <Title order={2} className={styles.title}>{productName}</Title>
                {isLoading || sizeLoading && productType !== -1 ? (
                    <Center>
                        <Loader color="green" variant="dots" />
                    </Center>
                ) : (
                    <Grid gutter="xl">
                        <Grid.Col xs={12} sm={3}>
                            <ProductListSidebar
                                sizes={sizes?.data}
                                orderBy={orderBy} 
                                setOrderBy={setOrderBy}
                                collection={collection}
                                setCollection={setCollection}
                                size={size}
                                setSize={setSize}
                                showCollections={allProducts}
                            />
                        </Grid.Col>
                        <Grid.Col xs={12} sm={9}>
                            {filteredProducts && filteredProducts.length > 0 ? (
                                <div className={styles.productList}>
                                    <Grid>
                                        {filteredProducts.map((p, i:number) => {
                                            return (
                                                <Grid.Col xs={6} sm={6} md={4} key={i}>
                                                    <ProductListItem product={p} background={i % 3} />
                                                </Grid.Col>
                                            )
                                        })}
                                    </Grid>
                                </div>
                            ) : (
                                <Title align="center" order={2}>
                                    No {allProducts ? 'products' : productName} found
                                </Title>
                            )}
                        </Grid.Col>
                    </Grid>
                )}
            </Container>
        </section>
    )
};

export default ProductListLayout;