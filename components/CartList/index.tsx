import { useDispatch } from "react-redux";
import { Avatar, Grid, Title, Text, CloseButton, Group, ActionIcon, ScrollArea } from '@mantine/core';
import { filter, findIndex } from "lodash";
import { FiPlus, FiMinus } from 'react-icons/fi';
import { get } from 'lodash';

import { ICartItem, setCart } from "@/redux/cart";
import { formatImagesArray, buildProductUrl, formatPrice } from '@/helpers';

import styles from './styles.module.scss';
import Link from "next/link";
import { IProduct } from '../../mongo/models/Product';

interface ICartList {
    cart: ICartItem[];
}

const CartList = ({ cart }: ICartList) => {
    const dispatch = useDispatch();

    const removeAllFromCart = (product: IProduct) => {
        let updatedCart: ICartItem[] = filter(cart, (c) => c.product._id !== product._id);

        if (updatedCart.length === 0) updatedCart = [];

        dispatch(setCart(updatedCart));
    };

    const updateProductQuantity = (product: IProduct, quantity: number) => {
        if (quantity === 0) return removeAllFromCart(product);

        const index: number = findIndex(cart, ((c) => c.product._id === product._id));
        let mutatableCart: ICartItem[] = [...cart];
        let replacementProduct: ICartItem = {
            ...cart[index],
            quantity: quantity
        };
 
        mutatableCart.splice(index, 1, replacementProduct);
        
        dispatch(setCart(mutatableCart));
    }

    return (
        <ScrollArea className={styles.cartList} type="auto">
            {cart.map((c: ICartItem, i: number) => {
                const { product, quantity } = c;
                const name = `${product.name} - ${product.size}`;
                const image = product.img_urls ? formatImagesArray(product.img_urls)[0] : '';
                const url = buildProductUrl(product);
                const salePrice = get(product, [ 'pricing', 'sale_price' ]);
                const price = (salePrice && salePrice !== 0) ? salePrice : product.pricing.price;
                // @ts-ignore
                const productPrice = formatPrice(quantity * price);

                return (
                    <div className={styles.cartListItem} key={i}>
                        <Grid>
                            <Grid.Col span={2}>
                                <Link href={url}>
                                    <a>
                                        <Avatar src={image} size="lg" alt={`Go to ${name}`} />
                                    </a>
                                </Link>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <div className={styles.productDetails}>
                                    <Group position="apart">
                                        <Title order={5}>{product.name}</Title>
                                        <Text size="xs">{productPrice}</Text>
                                    </Group>
                                    <Text size="xs">Size: {product.size}</Text>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Grid align="center">
                                    <Grid.Col span={2}>
                                        <CloseButton  
                                            aria-label={`Remove ${name} from cart`}
                                            onClick={() => removeAllFromCart(product)}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={10}>
                                        <div className={styles.quantityControls}>
                                            <ActionIcon 
                                                size={21}
                                                variant="default" 
                                                onClick={() => updateProductQuantity(product, quantity - 1)}
                                            >
                                                <FiMinus />
                                            </ActionIcon>
                                            <Text align="center" size="sm" className={styles.quantity}>{quantity}</Text>
                                            <ActionIcon 
                                                size={21}
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