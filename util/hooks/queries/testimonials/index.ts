import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { IAuthedRequest } from "../account";

const getTestimonials = () => axios.get('/api/testimonials');

const deleteTestimonial = ({ userId, token, data }: IAuthedRequest) => axios.delete(`/api/admin/testimonials?id=${data.id}`, {
    headers: {
        'Authorization': token,
    },
    params: {
        userId
    },
    withCredentials: true
});

const updateTestimonial = ({ userId, token, data }: IAuthedRequest) => axios.put(`/api/admin/testimonials?id=${data.id}`,
    {
        userId,
        testimonial: data.testimonialData
    },
    {
        headers: {
            'Authorization': token
        },
        withCredentials: true,
    }
);

const createTestimonial = ({ userId, token, data }: IAuthedRequest) => axios.post(`/api/admin/testimonials`,
    {
        userId,
        testimonial: data
    },
    {
        headers: {
            'Authorization': token,
        },
        withCredentials: true
    }
);

const getTestimonial = (id: string) => axios.get(`/api/testimonials?id=${id}`); 

export const useGetTestimonials = () => {
    const query = useQuery(['testimonials'], getTestimonials);
    return query;
};

export const useDeleteTestimonial = () => useMutation(deleteTestimonial);
export const useCreateTestimonial = () => useMutation(createTestimonial);
export const useUpdateTestimonial = () => useMutation(updateTestimonial);
export const useGetTestimonial = () => useMutation(getTestimonial);