import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text, Button, Select, Stack, Group, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { IProductLayout } from '..';
import ReviewStars from '@/components/ReviewStars';
import DetailsAccordion from './DetailsAccordion';
import { buildProductUrl } from '@/helpers';

import styles from './styles.module.scss';

const ProductDetails = ({ product }: IProductLayout) => {
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ size, setSize ] = useState<string>('');

    // TODO: add current review stars for review system, add care and details, add available sizes

    useEffect(() => {
        if (!product) return;
        setSize(product.size);
    }, [ product ]);

    const addToCart = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showNotification({
                title: 'Item added to cart',
                message: `Successfully added ${product?.name} - ${product?.size} to cart`,
                color: 'green'
            });
        }, 1000)
    };

    const handleSizeChange = (val: string|null) => {
        if (!product || !val) return;

        const productUrl = buildProductUrl(product, val);
        router.push(productUrl);
    };

    return (
        <aside className={styles.productDetails}>
            <Stack>
                <Text className={styles.description}>{product?.description}</Text>
                <div className={styles.reviews}>
                    <Group position="apart">
                        <ReviewStars rating={4.5} className={styles.stars} />
                        <Text size="sm">36 reviews</Text>
                    </Group>
                </div>
                <Select
                    className={styles.sizes}
                    label="Size Selection"
                    value={size}
                    onChange={(val) => handleSizeChange(val)}
                    data={[
                        { label: 'Kids', value: 'Kids' },
                        { label: 'Womens', value: 'Womens' },
                        { label: 'Mens', value: 'Mens' },
                        { label: 'Adults', value: 'Adults' },
                    ]}
                />
                <Button size="xl" variant="light" disabled={loading} color="green" onClick={addToCart}>
                    {loading ? <Loader color="green" variant="dots" /> : 'Add to Cart'}
                </Button>
                <DetailsAccordion product={product} />
            </Stack>
        </aside>
    )
};

export default ProductDetails;