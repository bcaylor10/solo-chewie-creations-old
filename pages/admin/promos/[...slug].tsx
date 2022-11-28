import { useEffect } from 'react';
import { useRouter } from "next/router";
import { isEmpty, get } from 'lodash';
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

import { useGetPromo, useDeletePromo, useUpdatePromo } from '@/queries/promos';
import { firebaseAuth } from "util/firebase";
import { PromoForm } from '@/components/AdminForms';

const EditPromo = () => {
    const queryClient = useQueryClient();
    const [ user ] = useAuthState(firebaseAuth);
    const router = useRouter();
    const slug = get(router, [ 'query', 'slug' ]);
    const { mutate: getPromo, isLoading, status, data } = useGetPromo();
    const { mutate: updatePromo, isLoading: updateLoading } = useUpdatePromo();
    const { mutate: deletePromo, isLoading: deleteLoading } = useDeletePromo();

    useEffect(() => {
        if (slug) getPromo(slug.toString());
    }, [ slug ]);

    useEffect(() => {
        if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error retrieving promo',
                color: 'red',
            });
        } else if (status === 'success') {
            if (isEmpty(data?.data)) router.push('/404');
        }
    }, [ status ]);

    const submit = (promoData: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return updatePromo({
                userId: user.uid,
                token,
                data: {
                    id: data?.data[0]._id,
                    promoData
                }
            })
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => showNotification({
            title: 'Success!',
            message: 'Promo updated successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error updating promo',
            color: 'red',
        }));
    };

    const handleDelete = () => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return deletePromo({
                userId: user.uid,
                token,
                data: {
                    id: data?.data[0]?._id
                }
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/promos'))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error deleting promo',
            color: 'red',
        }));
    }

    return (
        <PromoForm 
            onSubmit={submit}
            loading={isLoading || updateLoading}
            title="Edit Promo"
            buttonTitle="Update Promo"
            onDelete={handleDelete}
            deleteLoading={deleteLoading}
            formData={data?.data[0]}
        />
    )
}

export default EditPromo;