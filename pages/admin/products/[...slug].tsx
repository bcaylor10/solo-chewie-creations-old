import { useEffect } from "react";
import { useRouter } from "next/router";
import { get, isEmpty } from "lodash";
import { showNotification } from '@mantine/notifications';
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseAuth } from "util/firebase";
import { useGetProduct, useDeleteProduct, useUpdateProduct } from "@/queries/products";
import { ProductForm } from "@/components/AdminForms";

const ViewProduct = () => {
    const queryClient = useQueryClient();
    const [ user ] = useAuthState(firebaseAuth)
    const { mutate: deleteProduct, isLoading: deleteLoading } = useDeleteProduct();
    const { mutate: updateProduct, isLoading: updateLoading } = useUpdateProduct();
    const router = useRouter();
    const slug = get(router, [ 'query', 'slug' ]);
    const { data, isLoading, status } = useGetProduct(slug ? slug[0] : '', slug ? slug[1] : '');

    useEffect(() => {
        if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error retrieving product',
                color: 'red',
            });
        } else if (status === 'success') {
            if (isEmpty(data?.data)) router.push('/404');
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
        .then(() => showNotification({
            title: 'Success!',
            message: 'Product deleted successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error deleting product',
            color: 'red',
        }));
    }

    return (
        <ProductForm 
            onSubmit={submit}
            title="Edit Product"
            loading={isLoading || updateLoading}
            buttonTitle="Update Product"
            onDelete={handleDelete}
            deleteLoading={deleteLoading}
            formData={data?.data[0]}
        />
    )
};

export default ViewProduct;