import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ICreatePaymentIntent {
    amount: number;
    customer_id: string;
}

const createPaymentIntent = ({ amount, customer_id }: ICreatePaymentIntent) => {
    return axios.get('/api/stripe/payment-intent', { params: { amount, customer_id } })
};

const createCustomer = (user_id: string) => axios.post('/api/stripe/customer', { user_id });
const getCustomer = (user_id: string) => axios.get('/api/stripe/customer', { params: { user_id } })

export const useCreatePaymentIntent = () => useMutation(createPaymentIntent);
export const useCreateCustomer = () => useMutation(createCustomer);
export const useGetCustomer = () => useMutation(getCustomer);
