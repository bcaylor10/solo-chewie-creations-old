import { Container, Center, Loader, Grid, Title } from '@mantine/core';

import { IProduct } from '@/mongo/models/Product';

interface IProductListLayout {
    products: IProduct[] | null;
    productName: string;
    isLoading: boolean;
}

const ProductListLayout = ({ products, productName, isLoading }: IProductListLayout) => {
    return (
        <section>
            <Container>
                {isLoading ? (
                    <Center>
                        <Loader color="green" variant="dots" />
                    </Center>
                ) : (
                    products && products.length > 0 ? (
                        <Grid>
                            {products.map((p, i:number) => {
                                return (
                                    <Grid.Col span={4} key={i}>
                                        <Title align="center" order={3}>
                                            {p.name} - {p.size}
                                        </Title>
                                    </Grid.Col>
                                )
                            })}
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