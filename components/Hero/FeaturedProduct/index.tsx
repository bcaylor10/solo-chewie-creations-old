import Link from "next/link";
import { Title, Text } from "@mantine/core";
import cn from 'classnames';

import { IProduct } from "@/mongo/models/Product";
import { buildProductUrl, formatPrice } from '@/helpers';

import styles from './styles.module.scss';

interface IFeaturedProduct {
    product: IProduct;
    background?: string;
}

const FeaturedProduct = ({ product, background = 'tan' }: IFeaturedProduct) => {
    const url: string = buildProductUrl(product);

    return (
        <Link href={url}>
            <div className={cn(styles.featuredProduct, styles[background])}>
                <div className={styles.productInfo}>
                    <Title order={2}>
                        <span className={styles.productTitle}>{product.name} - {product.size}</span>
                    </Title>
                    <Text size="xs">
                        <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                    </Text>
                </div>
            </div>
        </Link>
    )
};

export default FeaturedProduct;