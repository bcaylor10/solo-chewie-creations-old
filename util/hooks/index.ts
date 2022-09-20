import { useRouter } from "next/router";

import routes from "@/routes";

export const useIsAdminRoute = (): boolean => {
    const router = useRouter();
    return router.pathname.includes(routes.admin.base);
}