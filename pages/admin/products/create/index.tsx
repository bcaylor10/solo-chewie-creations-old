import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { ProductForm } from "@/components/AdminForms";
import { useCreateProduct } from "@/queries/products";
import { firebaseAuth } from "util/firebase";

const CreateProduct = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: createProduct, isLoading } = useCreateProduct();

    const submit = (data: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return createProduct({
                userId: user.uid,
                token,
                data
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/products'))
        .then(() => showNotification({
            title: 'Success!',
            message: 'Product created successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error creating product',
            color: 'red',
        }));
    }

    return (
        <ProductForm
            onSubmit={submit}
            loading={isLoading}
            title="Create Product"
        />
    )
};

export default CreateProduct;