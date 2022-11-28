import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { TextInput, Grid, Button, Group, Textarea, NumberInput } from '@mantine/core';
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from 'yup';

import { ConfirmModal } from "@/components/Modals";
import AdminFormLayout from "@/layouts/AdminFormLayout";
import { IAdminForm } from "..";

const TestimonialForm = ({ onSubmit, loading, title, onDelete, formData, buttonTitle, deleteLoading }: IAdminForm) => {
    const [ open, setOpen ] = useState<boolean>(false);
    const schema = Yup.object().shape({
        rating: Yup.number().required(),
        message: Yup.string().required(),
        author: Yup.string().required(),
    });
    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            author: '',
            message: '',
            rating: 1.0,
        }
    });

    useEffect(() => {        
        if (!isEmpty(formData)) {
            const { 
                author,
                message,
                rating
            } = formData;

            form.setValues({
                author,
                message,
                rating
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
                            label="Author"
                            placeholder="Name of the author"
                            {...form.getInputProps('author')}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Textarea
                            className="input"
                            withAsterisk
                            label="Message"
                            placeholder="Main testimonial message"
                            {...form.getInputProps('message')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            className="input"
                            withAsterisk
                            label="Rating"
                            min={1}
                            max={5}
                            precision={1}
                            step={0.5}
                            {...form.getInputProps('rating')}
                        />
                    </Grid.Col>
                </Grid>
                <Group position="right" style={{ marginTop: '100px' }}>
                    {onDelete && (
                        <Button color="red" variant="light" onClick={() => setOpen(true)}>
                            Delete Testimonial
                        </Button>
                    )}
                    <Button color="green" type="submit">{buttonTitle || title}</Button>
                </Group>
            </form>
            <ConfirmModal
                open={open}
                onConfirm={onDelete}
                onClose={() => setOpen(false)}
                title="Delete Testimonial"
                content="Are you sure you want to delete this testimonial? It cannot be undone."
                isLoading={deleteLoading || false}
            />
        </AdminFormLayout>
    )
};

export default TestimonialForm;