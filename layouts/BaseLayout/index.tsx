import { Auth0Provider } from "@auth0/auth0-react";
import { useSelector } from "react-redux"; 

import Header from "components/Header";
import Footer from "components/Footer";
import Loader from "@/components/Loader";

const BaseLayout = ({ children }: any) => {
    const loading = useSelector((store: any) => store.site.loading);

    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
            redirectUri={process.env.NEXT_PUBLIC_DOMAIN || ''}
        >
            <Loader loading={loading} variant="bars" />
            <Header />
            <main>{children}</main>
            <Footer />
        </Auth0Provider>
    )
};

export default BaseLayout;