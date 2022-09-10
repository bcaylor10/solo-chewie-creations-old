import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTestimonials = () => axios.get('/api/testimonials');

export const useGetTestimonials = () => {
    const query = useQuery(['testimonials'], getTestimonials);
    return query;
};