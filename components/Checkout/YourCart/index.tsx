import { useState, useEffect, useMemo } from 'react';
import { Grid, Text, TextInput, Divider, Button, Stack, Radio, Group } from '@mantine/core';
import { isEmpty } from 'lodash';
import { useForm } from '@mantine/form';
import { FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import CartList from '@/components/CartList';
import { calculateTotalPrice, promoIsValid, formatPrice } from '@/helpers';
import { useGetPromo } from '@/queries/promos';
import { setCart } from '@/redux/cart';
import { ICheckout } from '..';

import styles from './styles.module.scss';

interface IForm {
    code: string;
}

const YourCart = ({ cart, local, setLocal, totalPrice, setTotalPrice }: ICheckout) => {
    // if (!cart || !local || !setLocal) return <></>;

    const dispatch = useDispatch();
    const { mutate: getPromo, isLoading, status, data } = useGetPromo();
    const [ shipping, setShipping ] = useState<string>('shipping');
    const form = useForm<IForm>({
        initialValues: {
            code: ''
        }
    });

    // BUG: updating product on admin panel forces user to remove and re-add to cart

    const total = useMemo(() => {
        const original = calculateTotalPrice(cart, !local, true);
        const promo = calculateTotalPrice(cart, !local, false);

        return { original, promo }
    }, [ cart, local ]);

    // TODO: loop through products and check if there is a promo that should be applied to not confused the user

    useEffect(() => {
        // verify cart is not empty, else it's 0
        if (cart.cartItems.length === 0) {
            setTotalPrice(0.00);
        } else {
            // total.promo will either be equal to original or discounted, so always use it
            const price = parseFloat(total.promo.substring(1));
            setTotalPrice(price || 0);
        }

    }, [ total ]);

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
                            {!isEmpty(cart.promo) && (
                                <span className={styles.oldPrice}>
                                    Original Due: <s>{total.original}</s>
                                </span>
                            )}
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