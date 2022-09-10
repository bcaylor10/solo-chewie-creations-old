/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { IProduct } from '@/mongo/models/Product';
import ProductTitle from '@/components/ProductTitle';
import cn from 'classnames';
import Link from 'next/link';
import { MdOutlineImageNotSupported } from 'react-icons/md';

import { formatImagesArray, buildProductUrl } from '@/helpers';

import styles from './styles.module.scss';

interface IProductListItem {
    product?: IProduct;
    background?: number;
}

const ProductListItem = ({ product, background = 0 }: IProductListItem) => {
    const [ images, setImages ] = useState<string[]>([]);
    const backgrounds: string[] = [ 'turqoise', 'green', 'tan' ];


    useEffect(() => {
        if (!product) return;
        if (product.img_urls) setImages(formatImagesArray(product.img_urls));
    }, [ product ]);

    return (
        <Link href={buildProductUrl(product)}>
            <a>
                <div className={cn(styles.productListItem, styles[backgrounds[background]])}>
                    <ProductTitle product={product} smaller />
                    {images.length > 0 ? (
                        <img 
                            src={images[0]} 
                            className={styles.productImage} 
                            alt={`${product?.name} - ${product?.size} image`} 
                        />
                    ) : (
                        <MdOutlineImageNotSupported className={styles.icon} />
                    )}
                </div>
            </a>
        </Link>
    )
};

export default ProductListItem;