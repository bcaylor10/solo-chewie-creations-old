import { Auth0Provider } from "@auth0/auth0-react";

import Loader from "@/components/Loader";
import { useIsAdminRoute } from "util/hooks";
import StoreLayout from "../StoreLayout";
import AdminLayout from "../AdminLayout";

export const API_URL = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2`;

const BaseLayout = ({ children }: any) => {
    const isAdminRoute = useIsAdminRoute();

    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
            redirectUri={process.env.NEXT_PUBLIC_DOMAIN || ''}
            audience={`${API_URL}/`}
            scope="update:users_app_metadata"
        >
            {isAdminRoute ? (
                <AdminLayout>
                    {children}
                </AdminLayout>
            ) : (
                <StoreLayout>
                    {children}
                </StoreLayout>
            )}
        </Auth0Provider>
    )
};

export default BaseLayout;