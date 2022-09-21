import { useEffect } from "react";
import { Loader, Grid, Card, Text, Button } from '@mantine/core';
import { FiPlusCircle } from 'react-icons/fi';
import cn from 'classnames';

import { useGetAddresses } from "@/queries/account";
import { IAddress } from "@/mongo/models/Address";

import styles from './styles.module.scss';

const Addresses = ({ user }: any) => {
    const { mutate: getAddresses, data, isLoading, status } = useGetAddresses();

    // TODO: add in delivery instructions
    useEffect(() => {
        if (user) {
            user.getIdToken(true).then((token: string) => {
                getAddresses({
                    userId: user.uid,
                    token
                });
            })
            .catch((err: any) => console.log('Error: ', err))
        }
    }, [ user ]);

    const editAddress = (address: IAddress) => {
        console.log(address)
        // will bring up address form via a modal with address' info
        // will have google places + optional manual entry
        // have option to delete
    }

    const setDefaultAddress = (address: IAddress) => {
        console.log(address)
        // will set default address and remove default from all others
    };

    const addAddress = () => {
        // will bring up address form via a modal
        // will have google places + optional manual entry
    };

    return (
        <>
            {isLoading && <Loader color="teal" variant="dots" />}
            <Grid align="stretch">
                <Grid.Col span={4}>
                    <Card 
                        className={cn(styles.addressCard, styles.addAddress)} 
                        shadow="md" 
                        radius="md" 
                        withBorder
                        onClick={addAddress}
                    >
                        <FiPlusCircle className={styles.icon} color="green" />
                    </Card>
                </Grid.Col>
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
                                    {!d.default && (
                                        <Button 
                                            variant="light"
                                            color="green" 
                                            compact 
                                            size="xs" 
                                            onClick={() => setDefaultAddress(d)}
                                        >
                                            Make Default
                                        </Button>
                                    )}
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