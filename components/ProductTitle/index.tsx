import { Title, Text } from '@mantine/core';
import cn from 'classnames';

import { IProduct } from '@/mongo/models/Product';
import { formatPrice } from '../../util/helpers';

import styles from './styles.module.scss';

interface IProductTitle {
    product?: IProduct | null | undefined;
    smaller?: boolean;
}

const ProductTitle = ({ product, smaller = false }: IProductTitle) => {
    if (!product) return <></>;

    return (
        <div className={styles.productInfo}>
            <Title order={2} size={smaller ? 18 : 26} className="no-margin">
                <span className={cn(styles.productTitle, smaller && styles.smaller)}>{product?.name} - {product?.size}</span>
            </Title>
            <Text size={smaller ? 'xs' : 'sm'}  weight={600}>
                <span className={cn(styles.productPrice, smaller && styles.smaller)}>
                    {formatPrice(product.price)}
                </span>
            </Text>
        </div>
    )
};

export default ProductTitle;