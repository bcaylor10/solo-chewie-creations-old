import Link from "next/link";
import cn from 'classnames';

import ProductTitle from "@/components/ProductTitle";
import { IProduct } from "@/mongo/models/Product";
import { buildProductUrl, formatImagesArray } from '@/helpers';

import styles from './styles.module.scss';

interface IFeaturedProduct {
    product: IProduct;
    large?: boolean;
    background?: string;
}

const FeaturedProduct = ({ product, large = false, background = 'tan' }: IFeaturedProduct) => {
    if (!product) return <></>;
    const url: string = buildProductUrl(product);
    let image: string = '';

    if (product.img_urls && product.img_urls.length > 0) {
        const images = formatImagesArray(product.img_urls);
        image = images[0];
    }

    return (
        <Link href={url}>
            <div className={cn(styles.featuredProduct, styles[background], large && styles.large)}>
                <ProductTitle product={product} />
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