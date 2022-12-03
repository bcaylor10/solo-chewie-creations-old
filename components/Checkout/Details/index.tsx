import { useEffect, useMemo } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { showNotification } from '@mantine/notifications';
import { Grid, Button } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';


import { useCreatePaymentIntent, useGetCustomer } from '@/queries/stripe';
import Loader from '@/components/Loader';
import CheckoutForm from './CheckoutForm';
import { firebaseAuth } from 'util/firebase';



// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);
// const stripeOptions = {
//     clientSecret: process.env.STRIPE_SECRET_KEY
// }

interface IFormData {

}

const Details = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const { mutate: createPaymentIntent, data: keys, isLoading, status } = useCreatePaymentIntent();
    const { mutate: getCustomer, data: customer, isLoading: customerLoading, status: customerStatus } = useGetCustomer();
    const stripe = useMemo(() => {
        if (keys?.data) {
            return loadStripe(keys.data.publishable_key);
        }
    }, [ keys ]);
    const form = useForm<IFormData>();

    // TODO: pass and set a total cost
    // TODO: get customer from stripe via metadata key, check if deleted. if deleted or 404, show error

    useEffect(() => {
        if (!user) return;
        getCustomer(user.uid);  
    }, [ user ]);

    useEffect(() => {
        if (!customer?.data) return;
        createPaymentIntent({ amount: 40, customer_id: customer.data.id });
    }, [ customer ])

    useEffect(() => {
        if (status === 'error' || customerStatus === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error preparing payment',
                color: 'red',
            });
        }
    }, [ status, customerStatus ]);

    const submit = (e) => {
        e.preventDefault();

    };

    return (
        <>
            {isLoading || customerLoading || !stripe ? (
                <Loader loading={isLoading} />
            ) : (
                <Grid>
                    <Grid.Col span={6}>

                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Elements stripe={stripe} options={{ clientSecret: keys && keys.data.client_secret }}>
                            <CheckoutForm />
                        </Elements>
                    </Grid.Col>
                </Grid>
            )}
        </>
        
    );
};

export default Details;