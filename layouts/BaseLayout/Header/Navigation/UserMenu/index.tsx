import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiShoppingCart } from 'react-icons/fi';
import { Group, Button } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import AvatarButton from "./AvatarButton";
import { MobileMenu } from "..";
import { setLoading } from "@/redux/site";
import routes from '@/routes';
import CartDrawer from "../CartDrawer";

import styles from './styles.module.scss';


const UserMenu = () => {
    const { user, isLoading, loginWithPopup } = useAuth0();
    const [ showSuccess, setShowSuccess ] = useState<boolean>(false);
    const [ cartAmount, setCartAmount ] = useState<number>(0);
    const [ showCart, setShowCart ] = useState<boolean>(false);
    const cart = useSelector((store: any) => store.cart);
    const dispatch = useDispatch();
    const router = useRouter();

    const calculateCartAmount = (): number => {
        let quantity: number = 0;
        
        if (cart.length > 0) {
            cart.forEach((c: any) => quantity += c.quantity);
        }

        return quantity;
    };

    useEffect(() => {
        if (!cart) return;
        setCartAmount(calculateCartAmount());
    }, [ cart ]);

    const handleLogin = () => {
        loginWithPopup()
        .then(() => setShowSuccess(true))
        .catch((err) => {
            console.log(err);
            showNotification({
                title: 'Login failed',
                message: `There was an issue with logging in. Please try again`,
                color: 'red'
            });
        })        
    }

    useEffect(() => {
        if (showSuccess && user) {
            showNotification({
                title: 'Login successful',
                message: `Welcome, ${user?.nickname}!`,
                color: 'green'
            });
        }
    }, [ showSuccess ]);

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [ isLoading ]);

    return (
        <>
            <Group position="right">
                <span role="button" className={styles.cartButton} onClick={() => setShowCart(true)}>
                    <FiShoppingCart 
                        className={styles.cart} 
                        aria-label="Cart" 
                    />
                    <span className={styles.cartAmount}>{cartAmount}</span>
                </span>
                {user ? <AvatarButton user={user} /> : (
                    <Button color="green" variant="light" onClick={handleLogin}>Log In</Button>
                )}
                <MobileMenu />
            </Group>
            <CartDrawer open={showCart} setOpen={setShowCart} />
        </>
    )
};

export default UserMenu;