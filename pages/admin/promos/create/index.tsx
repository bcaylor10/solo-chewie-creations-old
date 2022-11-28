import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { PromoForm } from "@/components/AdminForms";
import { useCreatePromo } from "@/queries/promos";
import { firebaseAuth } from "util/firebase";

const CreatePromo = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: createPromo, isLoading } = useCreatePromo();

    const submit = (data: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return createPromo({
                userId: user.uid,
                token,
                data
            });
        })
        .then(() => queryClient.invalidateQueries())
        // .then(() => router.push('/admin/promos'))
        .then(() => showNotification({
            title: 'Success!',
            message: 'Promo created successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error creating promo',
            color: 'red',
        }));
    }

    return (
        <PromoForm
            onSubmit={submit}
            loading={isLoading}
            title="Create Promo"
        />
    )
};

export default CreatePromo;