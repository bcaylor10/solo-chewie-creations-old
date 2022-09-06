import { Divider, Drawer, Title, Text, Group, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSelector } from 'react-redux';
import { FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';
import cn from 'classnames';

import { IUser } from '../UserMenu/AvatarButton';
import CartList from '@/components/CartList';
import { calculateTotalPrice} from '@/helpers';
import routes from '@/routes';

import styles from './styles.module.scss';

interface ICartDrawer {
    open: boolean;
    setOpen: any;
}

const CartDrawer = ({ open, setOpen }: ICartDrawer) => {
    const cart = useSelector((store: any) => store.cart);
    const matches = useMediaQuery('(max-width: 768px)');

    return (
        <Drawer
            opened={open}
            onClose={() => setOpen(false)}
            position="right"
            padding="xl"
            size={matches ? 'full' : 'lg'}
        >
            {cart && cart.length > 0 ? (
                <div className={cn(styles.validCart, styles.cartWrapper)}>
                    <Title order={3} className={styles.cartTitle}>My Cart</Title>
                    <CartList cart={cart} />
                    <div className={styles.checkout}>
                        <Divider className={styles.divider} />
                        <Text size="xs" className={styles.shippingText}>
                            Shipping costs calculated at checkout. Local pickup is available as well.
                        </Text>
                        <Group position="apart" className={styles.total}>
                            <Text size="xs">Total:</Text>
                            <Text size="xs">{calculateTotalPrice(cart)}</Text>
                        </Group>
                        <Link href={routes.checkout}>
                            <Button fullWidth size="lg" variant="filled" color="green">Checkout</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={cn(styles.emptyCart, styles.cartWrapper)}>
                    <div role="img" aria-label="cart-icon" className={styles.cartIcon}>
                        <FiShoppingBag />
                    </div>
                    <Title order={3} align="center">
                        Your cart is empty
                    </Title>
                </div>
            )}
        </Drawer>
    )
};

export default CartDrawer;