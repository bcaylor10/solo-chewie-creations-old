import { useEffect, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { showNotification } from '@mantine/notifications';
import { Grid, LoadingOverlay, Text, Title } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import cn from 'classnames';

import { useCreatePaymentIntent, useGetCustomer } from '@/queries/stripe';
import Loader from '@/components/Loader';
import CheckoutForm from './CheckoutForm';
import { firebaseAuth } from 'util/firebase';
import { IAddress } from '@/mongo/models/Address';
import { useGetAddresses } from '@/queries/account/addresses';
import { sortBy } from 'lodash';

import styles from './styles.module.scss';
import { ICart } from '@/redux/cart';

interface IDetails {
    cart: ICart;
    local: boolean;
    totalPrice: number;
}

const Details = ({ cart, local, totalPrice }: IDetails) => {
    const [ user ] = useAuthState(firebaseAuth);
    const { mutate: createPaymentIntent, data: keys, isLoading, status } = useCreatePaymentIntent();
    const { mutate: getAddresses, data: addresses, isLoading: addressLoading, status: addressStatus } = useGetAddresses();
    const { mutate: getCustomer, data: customer, isLoading: customerLoading, status: customerStatus } = useGetCustomer();
    const [ selectedAddress, setSelectedAddress ] = useState<string>('');
    const [ processingPayment, setProcessingPayment ] = useState<boolean>(false);

    const stripe = useMemo(() => {
        if (keys?.data) {
            return loadStripe(keys.data.publishable_key);
        }
    }, [ keys ]);

    // TODO: pass and set a total cost
    // TODO: get customer from stripe via metadata key, check if deleted. if deleted or 404, show error

    useEffect(() => {
        if (user && !local) {
            user.getIdToken(true).then((token: string) => {
                getAddresses({
                    userId: user.uid,
                    token
                });
            })
            .catch((err: any) => console.log('Error: ', err));
        }
    }, [ user, local ]);

    useEffect(() => {
        if (addresses?.data.lenght === 0) return;

        const defaultAddress: IAddress = addresses?.data.filter((a: IAddress) => a.default)[0];
        if (defaultAddress?._id) setSelectedAddress(defaultAddress._id.toString());        
    }, [ addresses ])

    useEffect(() => {
        if (!user) return;
        getCustomer(user.uid);  
    }, [ user ]);

    useEffect(() => {
        if (!customer?.data) return;
        if (user) {
            user.getIdToken(true).then((token: string) => {
                createPaymentIntent({ amount: 40, customer_id: customer.data.id, token });
            }).catch((err) => console.log("Error: ", err))
        }
    }, [ customer ])

    useEffect(() => {
        if (status === 'error' || customerStatus === 'error' || addressStatus === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error preparing payment',
                color: 'red',
            });
        }
    }, [ status, customerStatus ]);

    return (
        <>
            <LoadingOverlay color="green" visible={processingPayment} />
            {isLoading || customerLoading || addressLoading || !stripe ? (
                <Loader loading={isLoading} />
            ) : (
                <Grid>
                    <Grid.Col span={6}>
                        {local ? (
                            <Title order={3} className={styles.title}>Local Pickup Selected</Title>
                        ) : (
                            <>
                                {addresses?.data && addresses.data.length > 0 ? (
                                    <>
                                        <Title order={3} className={styles.title}>Shipping Address</Title>
                                        <div className={styles.addressList}>
                                            {sortBy(addresses?.data, (a: IAddress) => !a.default).map((a: IAddress) => {
                                                // @ts-ignore
                                                const id = a._id.toString();
                                                return (
                                                    <div 
                                                        key={id}
                                                        className={cn(styles.addressListItem, { selected: id === selectedAddress })}
                                                        onClick={() => setSelectedAddress(id)}
                                                    >
                                                        <Text size="sm">{`${a.address1} ${a.address2}`}</Text>
                                                        <Text size="sm">{`${a.city}, ${a.state} ${a.zip}`}</Text>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <p>you don&#39;t have any addresses</p>
                                )}
                            </>
                        )}
                        
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Title order={3} className={styles.title}>Payment Method</Title>
                        <Elements stripe={stripe} options={{ clientSecret: keys && keys.data.client_secret }}>
                            <CheckoutForm 
                                cart={cart}
                                totalPrice={totalPrice}
                                selectedAddress={selectedAddress} 
                                addresses={addresses?.data}
                                user={user}
                                setProcessingPayment={setProcessingPayment}
                                clientSecret={keys ? keys.data.client_secret : ''}
                            />
                        </Elements>
                    </Grid.Col>
                </Grid>
            )}
        </>
        
    );
};

export default Details;