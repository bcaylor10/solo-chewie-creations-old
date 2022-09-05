import { useSelector } from 'react-redux';
import { Grid } from '@mantine/core';

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
            )}
        </>
    );
};

export default ProductLayout;