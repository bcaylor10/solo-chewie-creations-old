import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, Stack } from '@mantine/core';

import { useFeaturedProducts } from "@/queries/products";
import { IProduct } from "@/mongo/models/Product";
import Loader from '../Loader';

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
                <Loader loading={isLoading} />
            ) : (
                featured.length > 0 ? (
                    <Grid gutter={0} className={styles.productContainer}>
                        <Grid.Col span={6}>
                            <FeaturedProduct product={featured[0]} large />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Stack spacing={0} className={styles.stack}>
                                <FeaturedProduct product={featured[1]} background={colors[0]} />
                                <FeaturedProduct product={featured[2]} background={colors[1]} />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                ) : (
                    <h1>No products found</h1>
                )
            )}
        </div>
    )
};

export default Hero;