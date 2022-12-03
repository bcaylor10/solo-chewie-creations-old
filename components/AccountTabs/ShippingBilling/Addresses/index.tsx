import { useState, useEffect } from "react";
import { Grid, Card, Text, Button, Chip } from '@mantine/core';
import { FiPlusCircle } from 'react-icons/fi';
import cn from 'classnames';
import { showNotification } from '@mantine/notifications';

import { useGetAddresses, useUpdateAddress } from "@/queries/account/addresses";
import { IAddress } from "@/mongo/models/Address";
import AddressForm from "./AddressForm";
import Loader from "@/components/Loader";

import styles from './styles.module.scss';

const Addresses = ({ user }: any) => {
    const { mutate: getAddresses, data, isLoading, status } = useGetAddresses();
    const { mutate: updateAddress, isLoading: updateLoading, status: updateStatus } = useUpdateAddress();
    const [ open, setOpen ] = useState<boolean>(false);
    const [ updated, setUpdated ] = useState<boolean>(false);
    const [ currentAddress, setCurrentAddress ] = useState<IAddress|null>(null);

    useEffect(() => {
        if (user) {
            user.getIdToken(true).then((token: string) => {
                getAddresses({
                    userId: user.uid,
                    token
                });
            })
            .catch((err: any) => console.log('Error: ', err));

            setUpdated(false);
        }
    }, [ user, updated ]);

    const closeForm = () => {
        setOpen(false);
        setTimeout(() => {
            setCurrentAddress(null);
        }, 200)
    }

    const editAddress = (address: IAddress) => {
        setCurrentAddress(address);
        setOpen(true);
    }

    const setDefaultAddress = (address: IAddress) => {
        user.getIdToken(true).then((token: string) => {
            updateAddress({
                userId: user.uid,
                token: token,
                data: {
                    ...address,
                    default: true
                }
            });
        })
        .then(() => setUpdated(true))
        .catch((err: any) => console.log('Error: ', err));
    };

    useEffect(() => {
        if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error getting addresses',
                color: 'red',
            });
        }
    }, [ status ]);

    useEffect(() => {
        if (updateStatus === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Successfully updated default address',
                color: 'green',
            });
        } else if (updateStatus === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error updating default address',
                color: 'red',
            });
        }
    }, [ updateStatus ]);

    return (
        <>            
            <AddressForm 
                setUpdated={setUpdated}
                user={user} 
                open={open} 
                onClose={closeForm} 
                address={currentAddress} 
            />
            <Grid align="stretch">
                
                <Grid.Col span={4}>
                    <Card 
                        className={cn(styles.addressCard, styles.addAddress)} 
                        shadow="md" 
                        radius="md" 
                        withBorder
                        onClick={() => setOpen(true)}
                    >
                        <FiPlusCircle className={styles.icon} color="green" />
                    </Card>
                </Grid.Col>
                {(isLoading || updateLoading) && (
                    <Grid.Col span={8} className={styles.loaderColumn}>
                        <Loader loading absolute />
                    </Grid.Col>
                )}
                {data?.data.sort((x: IAddress, y: IAddress) => x.default ? -1 : y.default ? 1 : 0).map((d: IAddress, i: number) => {
                    return (
                        <Grid.Col key={i} span={4}>
                            <Card className={styles.addressCard} shadow="md" radius="md" withBorder>
                                <div className={styles.addressInfo}>
                                    <Text size="sm">{d.address1}</Text>
                                    {d.address2 && <Text size="sm">{d.address2}</Text>}
                                    <Text size="sm">{d.city}, {d.state} {d.zip}</Text>
                                </div>
                                <div className={styles.addressActions}>
                                    <Button 
                                        variant="light" 
                                        color="red" 
                                        compact 
                                        size="xs" 
                                        onClick={() => editAddress(d)}
                                    >
                                        Edit
                                    </Button>
                                    <Chip
                                        role={d.default ? 'contentinfo' : 'button'}
                                        className={cn(d.default && styles.defaultChip)}
                                        checked={d.default} 
                                        onChange={() => !d.default ? setDefaultAddress(d) : null}
                                        size="xs"
                                        radius="sm"
                                        variant="filled"
                                    >
                                        {d.default ? 'Default' : 'Make Default'}
                                    </Chip>
                                </div>
                            </Card>
                        </Grid.Col>
                    )
                })}
            </Grid>
        </>
    )
};

export default Addresses;