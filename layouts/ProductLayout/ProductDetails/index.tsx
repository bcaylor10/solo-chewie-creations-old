import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text, Button, Select, Stack, Group, Loader, Center, Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { IProductLayout } from '..';
import ReviewStars from '@/components/ReviewStars';
import DetailsAccordion from './DetailsAccordion';
import { buildProductUrl, getRatingInfo, IRating, formatPrice } from '@/helpers';
import { useGetSizesForProduct } from '@/queries/products';
import { setCart } from '@/redux/cart';

import styles from './styles.module.scss';

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
    const [ rating, setRating ] = useState<IRating>({ count: 0, amount: 0 });
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ size, setSize ] = useState<string>('');
    const [ sizes, setSizes ] = useState<ISize[]>([]);

    useEffect(() => {
        if (!product) return;

        setSize(product.size);
        // @ts-ignore
        setRating(getRatingInfo(product.extras.rating));
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
    }, [ sizeData ]);

    const addToCart = () => {
        setLoading(true);
        const payload = {
            promo: cart?.promo,
            cartItems: [ ...cart.cartItems, product?._id ]
        };

        new Promise((resolve) => {
            resolve(dispatch(setCart(payload)))
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
                    <div className={styles.reviews}>
                        <Group position="apart">
                            <ReviewStars rating={rating.count} className={styles.stars} />
                            <Text size="sm">{rating.amount} review(s)</Text>
                        </Group>
                    </div>
                    <Select
                        className={styles.sizes}
                        label="Size Selection"
                        value={size}
                        onChange={(val) => handleSizeChange(val)}
                        data={sizes}
                    />
                    <Text>Price: {formatPrice(product?.price)}</Text>
                    <Text className={styles.notification} size="xs">
                        *Price is subject to change if specialty yarn is requested/required*
                    </Text>
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