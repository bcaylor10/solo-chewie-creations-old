import { useDispatch } from "react-redux";
import { Avatar, Grid, Title, Text, CloseButton, Group, ActionIcon, ScrollArea } from '@mantine/core';
import { filter, findIndex } from "lodash";
import { FiPlus, FiMinus } from 'react-icons/fi';
import Link from "next/link";
import cn from 'classnames';

import { IProduct } from '@/mongo/models/Product';
import { ICart, ICartItem, setCart } from "@/redux/cart";
import { formatImagesArray, buildProductUrl, formatPrice, calculatePromoCost } from '@/helpers';

import styles from './styles.module.scss';

interface ICartList {
    cart: ICart;
    large?: boolean;
}

const CartList = ({ cart, large }: ICartList) => {
    const dispatch = useDispatch();

    const removeAllFromCart = (product: IProduct) => {
        let updatedCart: ICartItem[] = filter(cart.cartItems, (c) => c.product._id !== product._id);

        if (updatedCart.length === 0) updatedCart = [];
        dispatch(setCart(updatedCart));
    };

    const updateProductQuantity = (product: IProduct, quantity: number) => {
        if (quantity === 0) return removeAllFromCart(product);

        const index: number = findIndex(cart.cartItems, ((c) => c.product._id === product._id));
        let mutatableCart: ICart = {
            cartItems: [ ...cart.cartItems ],
            promo: cart.promo
        };
        let replacementProduct: ICartItem = {
            ...cart.cartItems[index],
            quantity: quantity
        };
 
        mutatableCart.cartItems.splice(index, 1, replacementProduct);
        dispatch(setCart(mutatableCart));
    }

    return (
        <ScrollArea className={styles.cartList} type="auto">
            {cart.cartItems && cart.cartItems.map((c: ICartItem, i: number) => {
                const { product, quantity } = c;
                const name = `${product.name} - ${product.size}`;
                const image = product.img_urls ? formatImagesArray(product.img_urls)[0] : '';
                const url = buildProductUrl(product);
                const promoPrice = cart?.promo ? calculatePromoCost(product, quantity, cart.promo, true) : '';
                const originalPrice = formatPrice(product.price * quantity);
                // @ts-ignore
                const showPromo = promoPrice.trim().length > 0 && promoPrice !== originalPrice;

                return (
                    <div className={cn(styles.cartListItem, large && styles.large)} key={i}>
                        <Grid>
                            <Grid.Col span={2}>
                                <Link href={url}>
                                    <a>
                                        <Avatar src={image} size={large ? 'xl' : 'lg'} alt={`Go to ${name}`} />
                                    </a>
                                </Link>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <div className={styles.productDetails}>
                                    <Group position="apart">
                                        <Title order={5} size={large ? 'h3' : 'h5'}>{product.name}</Title>
                                        <Text size={large ? 'sm' : 'xs'}>
                                            {showPromo ? (
                                                <>
                                                    <span className={styles.promoPrice}>
                                                        <s>{originalPrice}</s>
                                                    </span>
                                                    {promoPrice}
                                                </>
                                            ) : originalPrice}
                                        </Text>
                                    </Group>
                                    <Text size={large ? 'sm' : 'xs'}>Size: {product.size}</Text>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Grid align="center">
                                    <Grid.Col span={2}>
                                        <CloseButton 
                                            size={large ? 25 : 21}
                                            aria-label={`Remove ${name} from cart`}
                                            onClick={() => removeAllFromCart(product)}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={10}>
                                        <div className={styles.quantityControls}>
                                            <ActionIcon 
                                                size={large ? 25 : 21}
                                                variant="default" 
                                                onClick={() => updateProductQuantity(product, quantity - 1)}
                                            >
                                                <FiMinus />
                                            </ActionIcon>
                                            <Text 
                                                align="center" 
                                                size={large ? 'md' : 'sm'}
                                                className={styles.quantity}
                                            >
                                                    {quantity}
                                                </Text>
                                            <ActionIcon 
                                                size={large ? 25 : 21}
                                                variant="default" 
                                                onClick={() => updateProductQuantity(product, quantity + 1)}
                                            >
                                                <FiPlus />
                                            </ActionIcon>
                                        </div>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        </Grid>
                    </div>
                )
            })}
        </ScrollArea>
    )
};

export default CartList;