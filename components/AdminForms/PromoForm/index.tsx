import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { TextInput, Grid, Button, Group, Select, NumberInput } from '@mantine/core';
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from 'yup';
import { DatePicker } from '@mantine/dates';

import AdminFormLayout from '@/layouts/AdminFormLayout';
import { ConfirmModal } from "@/components/Modals";
import { IAdminForm } from '..';

const PromoForm = ({ onSubmit, loading, title, buttonTitle, formData, onDelete, deleteLoading }: IAdminForm) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        code: Yup.string().required(),
        type: Yup.string().required(),
        discount_amount: Yup.number().required(),
        start_date: Yup.date().required(),
        expiration_date: Yup.date().nullable(),
    });
    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            name: '',
            code: '',
            type: '0',
            discount_amount: 0,
            start_date: null,
            expiration_date: null
        }
    });

    useEffect(() => {
        if (!isEmpty(formData)) {
            const { 
                name,
                code,
                type,
                discount_amount,
                start_date,
                expiration_date
            } = formData;

            form.setValues({
                name,
                code,
                type: type.toString(),
                discount_amount,
                start_date: start_date && new Date(start_date),
                expiration_date: expiration_date && new Date(expiration_date)
            });
        }
    }, [ formData ]);

    return (
        <AdminFormLayout loading={loading} title={title}>
            <form onSubmit={form.onSubmit(onSubmit)}>
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
                            label="Discount Amount"
                            icon={form.values.type === '0' ? '$' : '%'}
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
                    {onDelete && (
                        <Button color="red" variant="light" onClick={() => setOpen(true)}>
                            Delete Promo
                        </Button>
                    )}
                    <Button color="green" type="submit">{buttonTitle || title}</Button>
                </Group>
            </form>
            <ConfirmModal
                open={open}
                onConfirm={onDelete}
                onClose={() => setOpen(false)}
                title="Delete Promo"
                content="Are you sure you want to delete this promo? It cannot be undone."
                isLoading={deleteLoading || false}
            />
        </AdminFormLayout>
    )
}

export default PromoForm;