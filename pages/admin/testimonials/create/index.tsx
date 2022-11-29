import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { TestimonialForm } from "@/components/AdminForms";
import { useCreateTestimonial } from "@/queries/testimonials";
import { firebaseAuth } from "util/firebase";

const CreateTestimonial = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: createTestimonial, isLoading } = useCreateTestimonial();

    const submit = (data: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return createTestimonial({
                userId: user.uid,
                token,
                data
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/testimonials'))
        .then(() => showNotification({
            title: 'Success!',
            message: 'Testimonial created successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error creating testimonial',
            color: 'red',
        }));
    }

    return (
        <TestimonialForm 
            onSubmit={submit}
            loading={isLoading}
            title="Create Testimonial"
        />
    )
};

export default CreateTestimonial;