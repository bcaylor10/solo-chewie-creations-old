import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { IAddress } from '@/mongo/models/Address';

interface ICheckoutForm {
    selectedAddress: string;
    addresses: IAddress[] | [];
    user: any;
    setProcessingPayment: (val: boolean) => void;
}

const CheckoutForm = ({ selectedAddress, addresses, user, setProcessingPayment }: ICheckoutForm) => {
    const stripe = useStripe();
    const elements = useElements()

    const submit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessingPayment(true);

        const data: any = {
            elements,
            confirmParams: {
                return_url: 'https://localhost:3001/checkout',
            },
            redirect: 'if_required'
        };

        // selected address will be empty string if local pickup is set
        if (selectedAddress.length > 0) {
            // @ts-ignore
            const address = addresses.filter((a: IAddress) => a._id.toString() === selectedAddress)[0];

            data.confirmParams.shipping = {
                name: user.displayName,
                address: {
                    line1: address.address1,
                    line2: address.address2,
                    city: address.city,
                    state: address.state,
                    postal_code: address.zip
                }
            }
        };
         
        stripe.confirmPayment(data).then((res) => {
            setProcessingPayment(false);
            console.log(res);
            if (res.error) {
                showNotification({
                    title: 'Error!',
                    message: 'There was an issue completing your order',
                    color: 'red',
                });
            } else {
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