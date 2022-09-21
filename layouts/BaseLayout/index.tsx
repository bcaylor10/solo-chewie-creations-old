import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setCookie, deleteCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';

import { useIsAdminRoute } from "util/hooks";
import StoreLayout from "../StoreLayout";
import AdminLayout from "../AdminLayout";
import { firebaseAuth } from 'util/firebase';
import { setLoading } from '@/redux/site';

const BaseLayout = ({ children }: any) => {
    const [ user, loading ] = useAuthState(firebaseAuth);
    const dispatch = useDispatch();
    const isAdminRoute = useIsAdminRoute();

    useEffect(() => {
        if (!loading) {
            if (user && user.emailVerified) {
                setCookie('authed', true);
            } else {
                deleteCookie('authed');
            }
        }
    }, [ loading, user ]);

    useEffect(() => {
        dispatch(setLoading(loading));
    }, [ loading ]);

    // return (
    //     isAdminRoute ? (
    //         <AdminLayout>
    //             {children}
    //         </AdminLayout>
    //     ) : (
    //         <StoreLayout>
    //             {children}
    //         </StoreLayout>
    //     )
    // )

    return (
        <StoreLayout>
            {children}
        </StoreLayout>
    )
};

export default BaseLayout;