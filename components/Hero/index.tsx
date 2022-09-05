import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, Stack, Loader, Center, Title } from '@mantine/core';

import { useFeaturedProducts } from "@/queries/products";
import { IProduct } from "@/mongo/models/Product";

import styles from './styles.module.scss';
import FeaturedProduct from './FeaturedProduct';

const Hero = () => {
    const reduxLoading = useSelector((store: any) => store.site.loading);
    const [ featured, setFeatured ] = useState<IProduct[]>([]);
    const { status, data, isLoading } = useFeaturedProducts();
    const colors: string[] = [ 'turqoise', 'green' ];

    useEffect(() => {        
        if (status === 'success') {
            const shuffled = shuffle(data?.data);
            setFeatured(shuffled);
        }
    }, [ status ]);
    
    return (
        <div className={styles.hero}>
            {!reduxLoading && isLoading ? (
                <Center>
                    <Loader color="turqoise" variant="dots" />
                </Center>
            ) : (
                featured.length > 0 ? (
                    <Grid gutter={0} className={styles.productContainer}>
                        <Grid.Col sm={12} md={6}>
                            <FeaturedProduct product={featured[0]} large />
                        </Grid.Col>
                        <Grid.Col sm={12} md={6}>
                            <Stack spacing={0} className={styles.stack}>
                                <FeaturedProduct product={featured[1]} background={colors[0]} />
                                <FeaturedProduct product={featured[2]} background={colors[1]} />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                ) : (
                    <Title align="center" order={4}>No featured products found</Title>
                )
            )}
        </div>
    )
};

export default Hero;