import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { get, isEmpty } from "lodash";

import { TestimonialForm } from "@/components/AdminForms";
import { useUpdateTestimonial, useGetTestimonial, useDeleteTestimonial } from "@/queries/testimonials";
import { firebaseAuth } from "util/firebase";

const EditTestimonial = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const queryClient = useQueryClient();
    const router = useRouter();
    const slug = get(router, [ 'query', 'slug' ]);
    const { mutate: getTestimonial, isLoading, status, data } = useGetTestimonial();
    const { mutate: updateTestimonial, isLoading: updateLoading } = useUpdateTestimonial();
    const { mutate: deleteTestimonial, isLoading: deleteLoading } = useDeleteTestimonial();

    useEffect(() => {
        if (slug) getTestimonial(slug.toString());
    }, [ slug ]);

    useEffect(() => {
        if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error retrieving testimonial',
                color: 'red',
            });
        } else if (status === 'success') {
            if (isEmpty(data?.data)) router.push('/404');
        }
    }, [ status ]);

    const submit = (testimonialData: any) => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return updateTestimonial({
                userId: user.uid,
                token,
                data: {
                    id: data?.data._id,
                    testimonialData
                }
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/testimonials'))
        .then(() => showNotification({
            title: 'Success!',
            message: 'Testimonial updated successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error updating testimonial',
            color: 'red',
        }));
    }

    const handleDelete = () => {
        if (!user) return;

        user.getIdToken(true).then((token: string) => {
            return deleteTestimonial({
                userId: user.uid,
                token,
                data: {
                    id: data?.data?._id
                }
            });
        })
        .then(() => queryClient.invalidateQueries())
        .then(() => router.push('/admin/testimonials'))
        .then(() => showNotification({
            title: 'Success!',
            message: 'Testimonial deleted successfully',
            color: 'green',
        }))
        .catch(() => showNotification({
            title: 'Error!',
            message: 'Error deleting testimonial',
            color: 'red',
        }));
    }

    return (
        <TestimonialForm 
            onSubmit={submit}
            loading={isLoading || updateLoading}
            title="Edit Testimonial"
            buttonTitle="Update Testimonial"
            onDelete={handleDelete}
            deleteLoading={deleteLoading}
            formData={data?.data}
        />
    )
};

export default EditTestimonial;