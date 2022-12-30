import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import { useIsAdminRoute } from "util/hooks";
import StoreLayout from "../StoreLayout";
import AdminLayout from "../AdminLayout";
import { firebaseAuth } from 'util/firebase';
import { setLoading } from '@/redux/site';
import { useGetCart } from '@/queries/cart';
import { showNotification } from '@mantine/notifications';
import { setCart } from '@/redux/cart';

const BaseLayout = ({ children }: any) => {
    const { mutate: getCart, data } = useGetCart();
    const [ user, loading ] = useAuthState(firebaseAuth);
    const dispatch = useDispatch();
    const isAdminRoute = useIsAdminRoute();

    useEffect(() => {
        if (!loading) {
            if (user && user.emailVerified) {
                user.getIdToken().then((token: string) => {
                    return getCart(token);
                }).catch(() => {
                    showNotification({
                        title: 'Error!',
                        message: 'Error retrieving cart',
                        color: 'red',
                    })
                });

            }
        }
    }, [ loading, user ]);

    useEffect(() => {
        dispatch(setLoading(loading));
    }, [ loading ]);

    useEffect(() => {
        if (data?.data) {
            dispatch(setCart({ cartItems: data?.data?.cart_items || [] }));
        }
    }, [ data ])

    return (
        isAdminRoute ? (
            <AdminLayout>
                {children}
            </AdminLayout>
        ) : (
            <StoreLayout>
                {children}
            </StoreLayout>
        )
    )
};

export default BaseLayout;