import { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';

import Header from "../BaseLayout/Header";
import Sidebar from "./Sidebar";
import { firebaseAuth } from 'util/firebase';
import { useGetAdminUser } from "@/queries/account";
import Loader from "@/components/Loader";

const AdminLayout = ({ children }: any) => {
    const [ user ] = useAuthState(firebaseAuth);
    const  [ isAdmin, setIsAdmin ] = useState<boolean>(false);
    const { mutate: getAdminUser, isLoading, data, status } = useGetAdminUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            user.getIdToken(true).then((token: string) => {
                getAdminUser({
                    userId: user.uid,
                    token
                });
            })
            .catch((err) => console.log(err));
        }
    }, [ user ]);

    useEffect(() => {
        if (status === 'success') {
            if (data?.data) {
                setIsAdmin(true);
            } else {
                router.push('/');
            }
        } else if (status === 'error') router.push('/');
    }, [ status ]);

    return (
        <>
            {isLoading || !isAdmin ? (
                <Loader loading={isLoading} />
            ) : (
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
            )}
            
        </>
    )
};

export default AdminLayout;