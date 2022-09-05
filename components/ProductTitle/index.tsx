import { Title, Text } from '@mantine/core';

import { IProduct } from '@/mongo/models/Product';
import { formatPrice } from '../../util/helpers';

import styles from './styles.module.scss';

interface IProductTitle {
    product: IProduct | null;
}

const ProductTitle = ({ product }: IProductTitle) => {
    return (
        <div className={styles.productInfo}>
            <Title order={2} className="no-margin">
                <span className={styles.productTitle}>{product?.name} - {product?.size}</span>
            </Title>
            <Text size="xs">
                <span className={styles.productPrice}>{formatPrice(product?.price)}</span>
            </Text>
        </div>
    )
};

export default ProductTitle;