import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";

import Header from "../BaseLayout/Header";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }: any) => {
    const router = useRouter();

    return router.push('/');
    return (
        <AppShell
            padding="xl"
            navbar={<Sidebar />}
            header={<Header />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colors.gray[0] },
            })}
        >
            {children}
        </AppShell>
    )
};

export default AdminLayout;