import { Title, Text } from '@mantine/core';
import cn from 'classnames';

import { IProduct } from '@/mongo/models/Product';
import { formatPrice } from '../../util/helpers';

import styles from './styles.module.scss';

interface IProductTitle {
    product: IProduct | null;
}

const ProductTitle = ({ product }: IProductTitle) => {
    const onSale = product?.sale_price !== 0 || !product?.sale_price;

    return (
        <div className={styles.productInfo}>
            <Title order={2} className="no-margin">
                <span className={styles.productTitle}>{product?.name} - {product?.size}</span>
            </Title>
            <Text size="sm" weight={600}>
                <span className={cn(styles.productPrice, onSale && styles.onSale)}>
                    {formatPrice(product?.price)}
                </span>
                {onSale && (
                    <span>{formatPrice(product?.sale_price)}</span>
                )}
            </Text>
        </div>
    )
};

export default ProductTitle;