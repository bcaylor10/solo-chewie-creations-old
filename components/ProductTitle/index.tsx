import { Title, Text } from '@mantine/core';
import cn from 'classnames';

import { IProduct } from '@/mongo/models/Product';
import { formatPrice } from '../../util/helpers';

import styles from './styles.module.scss';

interface IProductTitle {
    product: IProduct | null;
}

const ProductTitle = ({ product }: IProductTitle) => {
    const onSale = product?.pricing?.sale_price !== 0;

    return (
        <div className={styles.productInfo}>
            <Title order={2} className="no-margin">
                <span className={styles.productTitle}>{product?.name} - {product?.size}</span>
            </Title>
            <Text size="sm" weight={600}>
                <span className={styles.productPrice}>
                    <span className={cn(onSale && styles.onSale)}>{formatPrice(product?.pricing?.price)}</span>
                    {onSale && formatPrice(product?.pricing?.sale_price)}
                </span>
            </Text>
        </div>
    )
};

export default ProductTitle;