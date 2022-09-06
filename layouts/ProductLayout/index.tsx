import { useSelector } from 'react-redux';
import { Grid } from '@mantine/core';
import Error from "next/error";

import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import Loader from '@/components/Loader';
import { IProduct } from '@/mongo/models/Product';

import styles from './styles.module.scss';

export interface IProductLayout {
    product: IProduct | null;
    isLoading?: boolean;
}

const ProductLayout = ({ product, isLoading }: IProductLayout) => {
    const reduxLoading = useSelector((store: any) => store.site.loading);
    return (
        <>
            {!reduxLoading && isLoading ? (
                <Loader loading={isLoading} />
            ) : (
                product ? (
                    <section className="no-padding">
                        <Grid className={styles.productLayout}>
                            <Grid.Col sm={12} md={7}>
                                <ProductImages product={product} isLoading={isLoading} />  
                            </Grid.Col>
                            <Grid.Col sm={12} md={5}>
                                <ProductDetails product={product} isLoading={isLoading} />
                            </Grid.Col>
                        </Grid>
                    </section>
                ) : <Error statusCode={404} />
            )}
        </>
    );
};

export default ProductLayout;