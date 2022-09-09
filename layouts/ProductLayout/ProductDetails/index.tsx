import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text, Button, Select, Stack, Group, Loader, Center, Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';

import { IProductLayout } from '..';
import ReviewStars from '@/components/ReviewStars';
import DetailsAccordion from './DetailsAccordion';
import { buildProductUrl } from '@/helpers';
import { useGetSizesForProduct } from '@/queries/products';

import styles from './styles.module.scss';
import { setCart } from '@/redux/cart';

interface ISize {
    label: string;
    value: string;
}

const ProductDetails = ({ product }: IProductLayout) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((store: any) => store.cart);
    // @ts-expect-error
    const { data: sizeData, isLoading: sizesLoading } = useGetSizesForProduct(product?.product_type);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ size, setSize ] = useState<string>('');
    const [ sizes, setSizes ] = useState<ISize[]>([]);

    // TODO: add current review stars for review system, add care and details, add available sizes

    useEffect(() => {
        if (!product) return;
        setSize(product.size);
    }, [ product, router.query.slug ]);

    useEffect(() => {
        if (!sizeData?.data || sizeData?.data.length === 0) return;

        const sizeOptions = sizeData.data.map((s: string[]) => {
            return {
                label: s,
                value: s
            }
        });

        setSizes(sizeOptions);
    }, [ sizeData ])

    const addToCart = () => {
        setLoading(true);
        
        new Promise((resolve) => {
            resolve(dispatch(setCart([
                ...cart,
                product
            ])));
        }).then((res) => {
            setLoading(false);
            showNotification({
                title: 'Item added to cart',
                message: `Successfully added ${product?.name} - ${product?.size} to cart`,
                color: 'green'
            });

        }).catch((err) => {
            console.log(err);
            setLoading(false);
            showNotification({
                title: 'Error adding item',
                message: `Failed to add ${product?.name} - ${product?.size} to cart`,
                color: 'red'
            });
        })
    };

    const handleSizeChange = (val: string | null) => {
        if (!product || !val) return;

        const productUrl = buildProductUrl(product, val);
        router.push(productUrl);
    };

    return (
        <aside className={styles.productDetails}>
            <Container>
            {sizesLoading ? (
                <Center className={styles.center}>
                    <Loader color="green" variant="dots" />
                </Center>
            ) : (
                <Stack>
                    <Text className={styles.description}>{product?.description}</Text>
                    {/* <div className={styles.reviews}>
                        <Group position="apart">
                            <ReviewStars rating={4.5} className={styles.stars} />
                            <Text size="sm">36 reviews</Text>
                        </Group>
                    </div> */}
                    <Select
                        className={styles.sizes}
                        label="Size Selection"
                        value={size}
                        onChange={(val) => handleSizeChange(val)}
                        data={sizes}
                    />
                    <Button size="xl" variant="filled" disabled={loading} color="green" onClick={addToCart}>
                        {loading ? <Loader color="green" variant="dots" /> : 'Add to Cart'}
                    </Button>
                    <DetailsAccordion product={product} />
                </Stack>
            )}
            </Container>
        </aside>
    )
};

export default ProductDetails;