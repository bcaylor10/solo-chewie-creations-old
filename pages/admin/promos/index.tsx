import { useEffect } from "react";
import { Table } from "@mantine/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseAuth } from "util/firebase";
import { useGetAllPromos } from "@/queries/promos";
import Loader from "@/components/Loader";
import { IPromo } from "@/mongo/models/Promo";

const Promos = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const { mutate: getAllPromos, data, isLoading } = useGetAllPromos();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            user.getIdToken(true).then((token: string) => {
                return getAllPromos({
                    userId: user.uid,
                    token
                });
            })
            .catch((err: any) => console.log('Error: ', err));

        }
    }, [ user ]);

    return (
        <>
            <Loader loading={isLoading} />
            <Table highlightOnHover verticalSpacing="md">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data && data.data.map((d: IPromo, i: number) => {
                        const url = `/admin/promos/${d.code.replace(' ', '-').toLowerCase()}`
                        return (
                            <tr 
                                onClick={() => router.push(url)} 
                                role="link" 
                                key={i} 
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{d.code}</td>
                                <td>{d.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
};

export default Promos;