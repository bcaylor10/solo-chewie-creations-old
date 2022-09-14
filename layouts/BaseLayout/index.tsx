import { Auth0Provider } from "@auth0/auth0-react";
import { useSelector } from "react-redux"; 

import Header from "./Header";
import Footer from "./Footer";
import Loader from "@/components/Loader";
import { ContactModal } from "@/components/Modals";
import OurProcess from "./OurProcess";

export const API_URL = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2`;

const BaseLayout = ({ children }: any) => {
    const loading = useSelector((store: any) => store.site.loading);

    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
            redirectUri={process.env.NEXT_PUBLIC_DOMAIN || ''}
            audience={`${API_URL}/`}
            scope="update:users_app_metadata"
        >
            <Loader loading={loading} variant="bars" />
            <Header />
            <main>
                {children}
                <OurProcess />
            </main>
            <Footer />
            <ContactModal />
        </Auth0Provider>
    )
};

export default BaseLayout;