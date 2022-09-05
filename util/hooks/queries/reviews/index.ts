import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getReviews = () => axios.get('/api/reviews');

export const useGetReviews = () => {
    const query = useQuery(['reivews'], getReviews);
    return query;
};