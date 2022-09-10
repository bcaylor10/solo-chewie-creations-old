import { useState, useEffect } from 'react';
import { Container, Center, Loader, Grid, Title } from '@mantine/core';
import { reverse, sortBy, orderBy as _orderBy } from 'lodash';

import { IProduct } from '@/mongo/models/Product';
import ProductListSidebar from './ProductListSidebar';
import ProductListItem from './ProductListItem';

import styles from './styles.module.scss';

interface IProductListLayout {
    products: IProduct[] | null;
    productName: string;
    isLoading: boolean;
}


const ProductListLayout = ({ products, productName, isLoading }: IProductListLayout) => {
    const [ orderBy, setOrderBy ] = useState<number>(0);
    const [ collection, setCollection ] = useState<string>('all');
    const [ orderedProducts, setOrderedProducts ] = useState<IProduct[]>([]);
    
    const orderProducts = (products: IProduct[]) => {
        let ordered: IProduct[] = [];

        switch (orderBy) {
            case 0:
                ordered = products;
                break;
            case 1:
                ordered = _orderBy(products, (p) => {
                    if (p.pricing.sale_price) {
                        return p.pricing.sale_price;
                    } else {
                        return p.pricing.price
                    }
                }, ['asc']);
                break;
            case 2:
                ordered = _orderBy(products, (p) => {
                    if (p.pricing.sale_price) {
                        return p.pricing.sale_price;
                    } else {
                        return p.pricing.price
                    }
                }, ['desc']);
                break;
        }

        switch (collection) {
            case 'all':
                ordered = ordered;
                break;
            case 'hats':
                ordered = ordered.filter((o) => o.name !== 'Hat');
                break;
            case 'scarves':
                ordered = ordered.filter((o) => o.name !== 'Scarf')
                break;
            case 'head-bands':
                ordered = ordered.filter((o) => o.name !== 'Head Band')
                break;
        }

        setOrderedProducts(ordered);
    }

    useEffect(() => {
        if (products && products.length > 0) {
            orderProducts(products)
        }
    }, [ products, orderBy ]);
    
    return (
        <section className={styles.productListLayout}>
            <Container size="lg">
                <Title order={2} className={styles.title}>{productName}</Title>
                {isLoading ? (
                    <Center>
                        <Loader color="green" variant="dots" />
                    </Center>
                ) : (
                    orderedProducts && orderedProducts.length > 0 ? (
                        <Grid gutter="xl">
                            <Grid.Col span={3}>
                                <ProductListSidebar 
                                    orderBy={orderBy} 
                                    setOrderBy={setOrderBy}
                                    collection={collection}
                                    setCollection={setCollection}
                                    showCollections={false}
                                />
                            </Grid.Col>
                            <Grid.Col span={9}>
                                <div className={styles.productList}>
                                    <Grid>
                                        {orderedProducts.map((p, i:number) => {
                                            return (
                                                <Grid.Col span={4} key={i}>
                                                    <ProductListItem product={p} background={i % 3} />
                                                </Grid.Col>
                                            )
                                        })}
                                    </Grid>
                                </div>
                            </Grid.Col>
                        </Grid>
                    ) : (
                        <Title align="center" order={2}>
                            No {productName} found
                        </Title>
                    )
                )}
            </Container>
        </section>
    )
};

export default ProductListLayout;