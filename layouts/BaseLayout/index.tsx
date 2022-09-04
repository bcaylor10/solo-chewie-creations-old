import { useState } from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import { Loader, Transition } from "@mantine/core";

import Header from "components/Header";
import Footer from "components/Footer";

import styles from './style.module.scss';

const BaseLayout = ({ children }: any) => {
    const [ loading, setLoading ] = useState<boolean>(true);

    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
            redirectUri={process.env.NEXT_PUBLIC_DOMAIN || ''}
        >
            <Transition mounted={loading} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={style} className={styles.loaderContainer}>
                        <Loader color="green" size="xl" variant="bars" className={styles.loader} />
                    </div>
                )}
            </Transition>
            <Header loading={loading} setLoading={setLoading} />
            <main>{children}</main>
            <Footer />
        </Auth0Provider>
    )
};

export default BaseLayout;