
import { IProductLayout } from '..';
import ProductTitle from '@/components/ProductTitle';

import styles from './styles.module.scss';

const ProductImages = ({ product }: IProductLayout) => {
    return (
        <div className={styles.ProductImages}>
            <ProductTitle product={product} />
        </div>
    )
};

export default ProductImages;