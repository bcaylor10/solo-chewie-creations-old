import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get, indexOf, isEmpty } from "lodash";
import { showNotification } from '@mantine/notifications';
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from 'yup';
import { TextInput, Textarea, Grid, Title, NumberInput, Button, Group, Select, Divider, Switch } from '@mantine/core';
import { Modal } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseAuth } from "util/firebase";
import { useGetProduct, useDeleteProduct, useUpdateProduct } from "@/queries/products";
import { ConfirmModal } from "@/components/Modals";
import { RepeatableGroup, ImageSelector, OrderableImageList } from "@/components/Forms";
import { AddButton } from "@/components/Buttons";
import { IImage } from "util/aws";
import AdminFormLayout from "@/layouts/AdminFormLayout";

const EditProduct = () => {
    const queryClient = useQueryClient();
    const [ user ] = useAuthState(firebaseAuth)
    const { mutate: deleteProduct, isLoading: deleteLoading } = useDeleteProduct();
    const { mutate: updateProduct, isLoading: updateLoading } = useUpdateProduct();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ showDelete, setShowDelete ] = useState<boolean>(false);
    const router = useRouter();
    const slug = get(router, [ 'query', 'slug' ]);
    const { data, isLoading, status } = useGetProduct(slug ? slug[0] : '', slug ? slug[1] : '');
    const schema = Yup.object().shape({
        product_type: Yup.number().required(),
        name: Yup.string().required(),
        description: Yup.string().required(),
        size: Yup.string().required(),
        labor_hours: Yup.number().required(),
        price: Yup.number().required(),
        promos: Yup.array().of(Yup.string()),
        img_urls:  Yup.array().of(Yup.string()),
        care: Yup.string(),
        details: Yup.string(),
        featured: Yup.boolean()
    });
    const form = useForm({
        validate: yupResolver(schema),
        initialValues: {
            product_type: 0,
            name: '',
            description: '',
            size: '',
            labor_hours: 0,
            price: 0.00,
            promos: [],
            img_urls: [],
            care: '',
            details: '',
            featured: false
        }
    });

    useEffect(() => {
        if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error retrieving product',
                color: 'red',
            });
        } else if (status === 'success') {
            if (isEmpty(data?.data)) {
                router.push('/404');
            }

            const { 
                product_type, 
                name, 
                description, 
                size, 
                labor_hours, 
                price,
                promos,
                img_urls,
                extras
            } = data?.data[0];

            form.setValues({
                product_type,
                name,
                description,
                size,
                labor_hours,
                price,
                promos,
                img_urls,
                care: extras.care,
                details: extras.details,
                featured: extras.featured
            });
        }
    }, [ status ]);

    const submit = (productData: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return updateProduct({
                userId: user.uid,
                token,
                data: {
                    id: data?.data[0]._id,
                    productData
                }
            })
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => showNotification({
            title: 'Success!',
            message: 'Product updated successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error updating product',
            color: 'red',
        }));
    };

    const handleDelete = () => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return deleteProduct({
                userId: user.uid,
                token,
                data: {
                    id: data?.data[0]?._id
                }
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/products'))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error deleting product',
            color: 'red',
        }));
    }

    return (
        <AdminFormLayout loading={isLoading || updateLoading} title="Edit Product">
            <form onSubmit={form.onSubmit(submit)}>
                <Grid>
                    <Grid.Col>
                        <TextInput
                            className="input"
                            withAsterisk
                            label="Product Name"
                            description="What the user will see the title of the product as"
                            placeholder="Name of the product"
                            {...form.getInputProps('name')}
                        />
                        <Select 
                            className="input"
                            withAsterisk
                            label="Product Type"
                            placeholder="Type of the product"
                            {...form.getInputProps('product_type')}
                            data={[
                                { label: 'Hat', value: 0 },
                                { label: 'Scarf', value: 1 },
                                { label: 'Head Band', value: 2 }
                            ]}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Textarea
                            className="input"
                            withAsterisk
                            label="Product Description"
                            placeholder="Description of the product"
                            {...form.getInputProps('description')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            className="input"
                            withAsterisk
                            label="Product Price"
                            placeholder="Price of the product"
                            parser={(value: string) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value: string) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                            }
                            {...form.getInputProps('price')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            className="input"
                            withAsterisk
                            label="Product Labor Hours"
                            placeholder="Labor hours of the product"
                            {...form.getInputProps('labor_hours')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <RepeatableGroup 
                            label="Product Promos"
                            name="promos"
                            placeholder="Promo Code"
                            form={form}
                            fields={form.values.promos}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Switch
                            label="Feature Product"
                            color="turqoise"
                            checked={form.values.featured}
                            {...form.getInputProps('featured')}
                        />
                    </Grid.Col>
                </Grid>
                <Divider my="xl" />
                <Grid>
                    <Grid.Col>
                        <Title order={3}>Extras</Title>
                    </Grid.Col>
                    <Grid.Col>
                        <Textarea
                            className="input"
                            withAsterisk
                            label="Product Care"
                            placeholder="Care of the product"
                            {...form.getInputProps('care')}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Textarea
                            className="input"
                            withAsterisk
                            label="Product Details"
                            placeholder="Details of the product"
                            {...form.getInputProps('details')}
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <Group align="center">
                            <Title order={3}>Images</Title>
                            <AddButton onClick={() => setOpen(true)} text="Choose" />
                        </Group>
                    </Grid.Col>
                    <Grid.Col>
                        <Grid>
                            {form.values.img_urls.length > 0 && (
                                <OrderableImageList images={form.values.img_urls} form={form} />
                            )}
                        </Grid>
                    </Grid.Col>
                </Grid>
                <Group position="right" style={{ marginTop: '100px' }}>
                    <Button color="red" variant="light" onClick={() => setShowDelete(true)}>Delete Product</Button>
                    <Button color="green" type="submit">Update Product</Button>
                </Group>
            </form>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title="Select Images"
                size="70%"
                padding="xl"
            >
                <ImageSelector
                    onClick={(img: IImage) => {
                        // @ts-ignore
                        if (form.values.img_urls && form.values.img_urls.includes(img.url)) {
                            const index = indexOf(form.values.img_urls, img.url);
                            form.removeListItem('img_urls', index);
                        } else {
                            form.insertListItem('img_urls', img.url)
                        }
                    }}
                    onClickTitle="Add Image"
                    selected={form.values.img_urls}
                />
            </Modal>
            <ConfirmModal
                open={showDelete}
                onConfirm={handleDelete}
                onClose={() => setShowDelete(false)}
                title="Delete Product"
                content="Are you sure you want to delete this product? It cannot be undone."
                isLoading={deleteLoading}
            />
        </AdminFormLayout>
    )
};

export default EditProduct;