import Link from "next/link";
import { Title, Text } from "@mantine/core";
import cn from 'classnames';

import { IProduct } from "@/mongo/models/Product";
import { buildProductUrl, formatPrice } from '@/helpers';

import styles from './styles.module.scss';

interface IFeaturedProduct {
    product: IProduct;
    large?: boolean;
    background?: string;
}

const FeaturedProduct = ({ product, large = false, background = 'tan' }: IFeaturedProduct) => {
    const url: string = buildProductUrl(product);
    let image: string = '';

    if (product.img_urls && product.img_urls.length > 0) {
        image = product.img_urls[0];
    }

    return (
        <Link href={url}>
            <div className={cn(styles.featuredProduct, styles[background], large && styles.large)}>
                <div className={styles.productInfo}>
                    <Title order={2} className="no-margin">
                        <span className={styles.productTitle}>{product.name} - {product.size}</span>
                    </Title>
                    <Text size="xs">
                        <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                    </Text>
                </div>
                {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        className={styles.productImage} 
                        src={image} 
                        alt={`${product.name} 
                        ${product.size} Image`}
                    />
                )}
            </div>
        </Link>
    )
};

export default FeaturedProduct;