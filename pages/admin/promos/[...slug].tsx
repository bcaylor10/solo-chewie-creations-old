import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { isEmpty, get } from 'lodash';
import { TextInput, Grid, Button, Group, Select, NumberInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from 'yup';
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { DatePicker } from '@mantine/dates';

import { useGetPromo, useDeletePromo, useUpdatePromo } from '@/queries/promos';
import AdminFormLayout from '@/layouts/AdminFormLayout';
import { firebaseAuth } from "util/firebase";
import { ConfirmModal } from "@/components/Modals";

const EditPromo = () => {
    const queryClient = useQueryClient();
    const [ user ] = useAuthState(firebaseAuth)
    const [ open, setOpen ] = useState<boolean>(false);
    const [ showDelete, setShowDelete ] = useState<boolean>(false);
    const router = useRouter();
    const slug = get(router, [ 'query', 'slug' ]);
    const { mutate: getPromo, isLoading, status, data } = useGetPromo();
    const { mutate: updatePromo, isLoading: updateLoading } = useUpdatePromo();
    const { mutate: deletePromo, isLoading: deleteLoading } = useDeletePromo();
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        code: Yup.string().required(),
        type: Yup.string().required(),
        discount_amount: Yup.number().required(),
        start_date: Yup.date().required(),
        expiration_date: Yup.date(),
    });
    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            name: '',
            code: '',
            type: '0',
            discount_amount: 0,
            start_date: new Date(),
            expiration_date: null
        }
    });

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

            const { 
                name,
                code,
                type,
                discount_amount,
                start_date,
                expiration_date
            } = data?.data[0];

            form.setValues({
                name,
                code,
                type: type.toString(),
                discount_amount,
                start_date: new Date(start_date),
                expiration_date
            });
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
        <AdminFormLayout loading={isLoading || updateLoading} title="Edit Promo">
            <form onSubmit={form.onSubmit(submit)}>
                <Grid>
                    <Grid.Col>
                        <TextInput
                            className="input"
                            withAsterisk
                            label="Promo Name"
                            description="A helpful identifier for you to know what the code is for"
                            placeholder="Name of the promo"
                            {...form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <TextInput
                            className="input"
                            withAsterisk
                            label="Promo Code"
                            placeholder="Code to activate promo"
                            {...form.getInputProps('code')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Select 
                            className="input"
                            withAsterisk
                            label="Discount Type"
                            data={[
                                { label: 'Amount Off', value: '0' },
                                { label: 'Percentage Off', value: '1' }
                            ]}
                            {...form.getInputProps('type')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            className="input"
                            withAsterisk
                            label="Amount Off"
                            parser={(value) => value?.replace(/\$%\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value || ''))
                                    ? `${form.values.type === '0' ? '$' : '%'} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    : `${form.values.type === '0' ? '$' : '%'} `
                                }
                            {...form.getInputProps('discount_amount')} 
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DatePicker
                            className="input"
                            withAsterisk
                            label="Start Date"
                            {...form.getInputProps('start_date')} 
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DatePicker
                            className="input"
                            label="Expiration Date"
                            {...form.getInputProps('expiration_date')} 
                        />
                    </Grid.Col>
                </Grid>
                <Group position="right" style={{ marginTop: '100px' }}>
                    <Button color="red" variant="light" onClick={() => setShowDelete(true)}>Delete Promo</Button>
                    <Button color="green" type="submit">Update Promo</Button>
                </Group>
            </form>
            <ConfirmModal
                open={showDelete}
                onConfirm={handleDelete}
                onClose={() => setShowDelete(false)}
                title="Delete Promo"
                content="Are you sure you want to delete this promo? It cannot be undone."
                isLoading={deleteLoading}
            />
        </AdminFormLayout>
    )
}

export default EditPromo;