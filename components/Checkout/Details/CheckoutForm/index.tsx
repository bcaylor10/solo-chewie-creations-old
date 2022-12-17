import { useEffect, useMemo, useState } from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { isEmpty } from 'lodash';

import { IAddress } from '@/mongo/models/Address';
import { useCreateOrder, useUpdateOrder, useGetUserUnfinishedOrders } from '@/queries/orders';
import { ICart } from '@/redux/cart';

interface ICheckoutForm {
    cart: ICart;
    totalPrice: number;
    selectedAddress: string;
    addresses: IAddress[] | [];
    user: any;
    setProcessingPayment: (val: boolean) => void;
    clientSecret: string;
}

const CheckoutForm = ({ cart, totalPrice, clientSecret, selectedAddress, addresses, user, setProcessingPayment }: ICheckoutForm) => {
    const { mutate: createOrder, data: order, status } = useCreateOrder();
    const { mutate: updateOrder, status: updateStatus } = useUpdateOrder();
    const { mutate: getCustomerOrder, data: customerOrder, status: customerOrderStatus } = useGetUserUnfinishedOrders();
    const stripe = useStripe();
    const elements = useElements();
    const address = useMemo(() => {
        // selected address will be empty string if local pickup is set
        if (selectedAddress.length > 0) {
            // @ts-ignore
            const filteredAddress = addresses.filter((a: IAddress) => a._id.toString() === selectedAddress)[0];
            return {
                line1: filteredAddress.address1,
                line2: filteredAddress.address2,
                city: filteredAddress.city,
                state: filteredAddress.state,
                postal_code: filteredAddress.zip
            }
        } else {
            return {}
        }
    }, [ selectedAddress ]);
    
    const submit = async (e: any) => {
        e.preventDefault();
        if (!elements || !stripe) return;

        // check if user has any orders

        createOrder({
            user_id: user.uid,
            products: cart.cartItems,
            total_cost: totalPrice,
            delivery: selectedAddress.length > 0,
            address: address,
            status: 'awaiting payment'
        });
    }

    useEffect(() => {
        if (!stripe) return;

        if (status === 'success') {
            const data: any = {
                elements,
                confirmParams: {
                    return_url: 'https://localhost:3001/checkout', // TODO: don't harcode
                },
                redirect: 'if_required'
            };

            
            if (!isEmpty(address)) {
                // @ts-ignore
                data.confirmParams.shipping = {
                    name: user.displayName,
                    address
                }
            };

            stripe.confirmPayment(data).then((res) => {
                setProcessingPayment(false);
                if (res.error) {
                    showNotification({
                        title: 'Error!',
                        message: 'There was an issue completing your order',
                        color: 'red',
                    });
                } else {
                    // update order to include order number
                    updateOrder({
                        ...order.data,
                        payment_id: res.paymentIntent.id,
                        status: 'pending'
                    });
                    showNotification({
                        title: 'Success!',
                        message: 'Order placed successfully',
                        color: 'green',
                    });
                }
            }).catch(() => {
                setProcessingPayment(false);
                showNotification({
                    title: 'Error!',
                    message: 'There was an issue completing your order',
                    color: 'red',
                });
            });
        }
    }, [ status ]);

    return (
        <form onSubmit={submit}>
            <PaymentElement />
            <Group position="right">
                <Button style={{ marginTop: '20px' }}type="submit" color="green">
                    Place Order
                </Button>
            </Group>
        </form>
    )
};

export default CheckoutForm;