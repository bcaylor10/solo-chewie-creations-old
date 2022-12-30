import { useState, useEffect, useMemo } from 'react';
import { Grid, Text, TextInput, Divider, Button, Stack, Radio, Group } from '@mantine/core';
import { countBy, find, isEmpty } from 'lodash';
import { useForm } from '@mantine/form';
import { FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import CartList from '@/components/CartList';
import { calculateTotalPrice, promoIsValid, formatPrice } from '@/helpers';
import { useGetPromo } from '@/queries/promos';
import { ICartItem, setCart } from '@/redux/cart';
import { ICheckout } from '..';
import { useGetProductsById } from "@/queries/products";

import styles from './styles.module.scss';
import { IProduct } from '@/mongo/models/Product';

interface IForm {
    code: string;
}

export interface ICartItemPrice {
    price: number;
    quantity: number;
}

const YourCart = ({ cart, local, setLocal, totalPrice, setTotalPrice }: ICheckout) => {
    const dispatch = useDispatch();
    const { mutate: getPromo, status, data } = useGetPromo();
    const { mutate: getProducts, data: products } = useGetProductsById();
    const [ shipping, setShipping ] = useState<string>('shipping');
    const form = useForm<IForm>({
        initialValues: {
            code: ''
        }
    });

    useEffect(() => {
        getProducts(cart.cartItems.map((p: ICartItem) => p.product));
    }, []);

    useEffect(() => {
        if (!products?.data) return;
        let total = 0;

        products.data.map((p: IProduct) => {
            // @ts-ignore
            const cartProduct = find(cart.cartItems, (c) => c.product === p._id.toString());
            total += p.price * (cartProduct?.quantity || 1);
        });

        if (!local) total += 7.99;

        setTotalPrice(parseFloat(total.toString()));
    }, [ products, local, cart ]);


    const submit = ({ code }: IForm) => {
        getPromo(code);
    };

    const handleShipping = (val: string) => {
        val === 'local' ? setLocal(true) : setLocal(false);
        setShipping(val);
    };

    useEffect(() => {
        if (status === 'error') form.setFieldError('code', 'Invalid promo');
    }, [ status ]);

    useEffect(() => {
        let validPromo = false;

        if (data?.data) {
            validPromo = promoIsValid(data?.data[0]);
            if (!validPromo) form.setFieldError('code', 'Invalid promo');
        }

        dispatch(setCart({
            cartItems: cart.cartItems,
            promo: validPromo ? data?.data[0] : null
        }))
    }, [ data ]);
    
    return (
        <Grid gutter="xl">
            <Grid.Col span={8}>
                {(cart?.cartItems && cart.cartItems.length > 0) ? (
                    <>
                        <CartList cart={cart} large />
                        <Divider my="lg" />
                        {!local && (
                            <Text align="right" className={styles.total}>
                                <span className={styles.oldPrice}>
                                    Shipping: $7.99
                                </span>
                            </Text>
                        )}
                        <Text align="right" className={styles.total}>
                            <span>
                                {(!local || !isEmpty(cart.promo)) && <Divider mb="md" />}
                                Total: {formatPrice(totalPrice)}
                            </span>
                        </Text>
                    </>
                ) : (
                    <div className={styles.emptyCart}>
                        <div role="img" aria-label="cart-icon" className={styles.cartIcon}>
                            <FiShoppingBag />
                        </div>
                        <Text>Your cart is empty.</Text>
                    </div>
                )}
            </Grid.Col>
            <Grid.Col span={4}>
                <div className={styles.priceSummary}>
                    <Stack>
                        <Radio.Group
                            value={shipping}
                            onChange={handleShipping}
                            label="I want to receive my item via:"
                            className={styles.radioGroup}
                        >
                            <Radio value="shipping" label="Shipping" />
                            <Radio value="local" label="Local Pickup (Columbus, OH)" />
                        </Radio.Group>
                        {/* <form onSubmit={form.onSubmit(submit)}>
                            <Group className={styles.promoGroup} position="left">
                                <TextInput 
                                    label="Apply Promo"
                                    className="input"
                                    placeholder="Enter promo code"
                                    {...form.getInputProps('code')}
                                />
                                {cart && cart?.promo && <FiCheckCircle className={styles.icon} />}
                            </Group>
                            <Button 
                                color="green" 
                                type="submit" 
                                loading={isLoading}
                            >
                                Apply Promo
                            </Button>
                        </form> */}
                    </Stack>
                </div>
            </Grid.Col>
        </Grid>
    )
};

export default YourCart;