import { useState, useEffect } from "react";
import { FiShoppingCart } from 'react-icons/fi';
import { Group, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

import AvatarButton from "./AvatarButton";
import { MobileMenu } from "..";
import CartDrawer from "../CartDrawer";
import { useIsAdminRoute } from "util/hooks";
import { setUserModal } from '@/redux/site';
import { firebaseAuth } from 'util/firebase';

import styles from './styles.module.scss';

const UserMenu = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const [ cartAmount, setCartAmount ] = useState<number>(0);
    const [ showCart, setShowCart ] = useState<boolean>(false);
    const cart = useSelector((store: any) => store.cart);
    const dispatch = useDispatch();
    const isAdminRoute = useIsAdminRoute();
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

    const signOutUser = () => {
        signOut(firebaseAuth).then(() => {
            router.push('/');
        }).catch((err) => console.log(err));
    }

    return (
        <>
            <Group position="right">
                {!isAdminRoute && (
                    <span role="button" className={styles.cartButton} onClick={() => setShowCart(true)}>
                        <FiShoppingCart 
                            className={styles.cart} 
                            aria-label="Cart" 
                        />
                        <span className={styles.cartAmount}>{cartAmount}</span>
                    </span>
                )}
                {user ? <AvatarButton user={user} signOutUser={signOutUser} /> : (
                    <Button color="green" variant="light" onClick={() => dispatch(setUserModal(true))}>
                        Log In / Sign Up
                    </Button>
                )}
                {!isAdminRoute && <MobileMenu />}
            </Group>
            <CartDrawer open={showCart} setOpen={setShowCart} />
        </>
    )
};

export default UserMenu;