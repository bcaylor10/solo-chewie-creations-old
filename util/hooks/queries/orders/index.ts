import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { IOrder } from "@/mongo/models/Order";

interface IOrderRequest {
    id: string;
    data: any;
}


const createOrder = (order: IOrder) => axios.post('/api/orders', order);
const updateOrder = ({ id, data }: IOrderRequest) => axios.put(`/api/order/${id}`, data);
const getUserOrders = (userId: string) => axios.get(`/api/orders`, { params: { userId } });
const getUserUnfinishedOrders = (userId: string) => axios.get('/api/orders', { params: { userId, status: 'awaiting payment' } });

export const useCreateOrder = () => useMutation(createOrder);
export const useUpdateOrder = () => useMutation(updateOrder);
export const useGetUserOrders = () => useMutation(getUserOrders);
export const useGetUserUnfinishedOrders = () => useMutation(getUserUnfinishedOrders);