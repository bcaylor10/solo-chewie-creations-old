import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button } from '@mantine/core';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements()

    const submit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://localhost:3001/checkout',
            },
            redirect: 'if_required'
        }).then((res) => {
            console.log('success: ', res)
        }).catch((err) => {
            console.log('error: ', err)
        });
    }

    return (
        <form onSubmit={submit}>
            <PaymentElement />
            <input type="hidden" name="user_id" value="12345" />
            <Button type="submit">Submit</Button>
        </form>
    )
};

export default CheckoutForm;