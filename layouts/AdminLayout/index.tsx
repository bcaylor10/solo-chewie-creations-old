import { AppShell } from "@mantine/core";

import Header from "../BaseLayout/Header";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }: any) => {
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