import { useIsAdminRoute } from "util/hooks";
import StoreLayout from "../StoreLayout";
import AdminLayout from "../AdminLayout";

const BaseLayout = ({ children }: any) => {
    const isAdminRoute = useIsAdminRoute();

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