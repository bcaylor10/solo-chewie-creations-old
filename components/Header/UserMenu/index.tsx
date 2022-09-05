import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiShoppingCart } from 'react-icons/fi';
import { Group, Button } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import { useAuth0 } from "@auth0/auth0-react";
import cn from 'classnames';
import { useDispatch } from "react-redux";

import AvatarButton from "./AvatarButton";
import routes from '@/routes';
import { setLoading } from "@/redux/site";

import styles from './styles.module.scss';


const UserMenu = () => {
    const { user, isLoading, loginWithPopup } = useAuth0();
    const [ showSuccess, setShowSuccess ] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();

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
        <Group position="right">
            <Link href={routes.cart}>
                <a>
                    <FiShoppingCart 
                        className={cn(styles.cart, router.pathname === routes.cart && styles.active)} 
                        aria-label="Cart" 
                    />
                </a>
            </Link>
            {user ? <AvatarButton user={user} /> : (
                <Button color="green" variant="subtle" onClick={handleLogin}>Log In</Button>
            )}
        </Group>
    )
};

export default UserMenu;