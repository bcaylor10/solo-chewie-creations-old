import { useState, useEffect } from 'react';
import { Modal, Alert, Button, TextInput, Group, Grid, Checkbox, LoadingOverlay } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { isEmpty } from 'lodash';
import * as Yup from 'yup';
import cn from 'classnames';
import { showNotification } from '@mantine/notifications';

import { IAddress } from "@/mongo/models/Address";
import validators from 'util/validators';
import { useCreateAddress, useUpdateAddress } from '@/queries/account/addresses';
import DeleteAddress from './DeleteAddress';

import styles from './styles.module.scss';

interface IAddressForm {
    setUpdated: any;
    user: any;
    address: IAddress | null;
    open: boolean;
    onClose: any;
}

const AddressForm = ({ setUpdated, user, address, open, onClose }: IAddressForm) => {
    const { mutate: createAddress, isLoading: creeateLoading, status: createStatus } = useCreateAddress();
    const { mutate: updateAddress, isLoading: updateLoading, status: updateStatus } = useUpdateAddress();
    const [ warning, setWarning ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const [ deleteModal, setDeleteModal ] = useState<boolean>(false);
    const schema = Yup.object().shape({
        userId: Yup.string().required(),
        address1: Yup.string().required(),
        address2: Yup.string(),
        city: Yup.string().required(),
        state: Yup.string().required().max(2),
        zip: validators.zip,
        default: Yup.boolean()
    });
    const form = useForm<IAddress>({
        validate: yupResolver(schema),
        initialValues: {
            userId: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            default: false
        }
    });

    const submit = (data: any) => {
        setError('');
        setWarning(false);
        form.resetDirty();

        user.getIdToken(true).then((token: string) => {
            const payload = {
                token: token,
                userId: user.uid,
                address: data
            };

            address ? updateAddress(payload) : createAddress(payload);
        })
        .catch(() => setError('Error creating/updating address'));
    };

    useEffect(() => {
        if (createStatus === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Address created successfully',
                color: 'green',
            });
            setUpdated(true);
            setSuccess(true);
            handleClose();
        } else if (createStatus === 'error') {
            setError('Error created address');
        }
    }, [ createStatus ]);

    useEffect(() => {
        if (updateStatus === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Address updated successfully',
                color: 'green',
            });
            setUpdated(true);
            setSuccess(true);
            handleClose();
        } else if (updateStatus === 'error') {
            setError('Error updating address');
        }
    }, [ updateStatus ]);

    const handleClose = () => {
        if (form.isDirty() && !warning && !success) {
            setWarning(true);
            return;
        }
        
        onClose();
        form.reset();
        form.resetDirty();
        setWarning(false);
        setSuccess(false);
    };

    useEffect(() => {
        if (address) {
            form.setValues(address);
        } else {
            if (user) {
                form.setFieldValue('userId', user.uid);
            };
        }

        form.resetDirty();
    }, [ address, user ]);

    const handleDeleteModal = (deleted = false) => {
        setDeleteModal(false);
        if (deleted) handleClose();
    };

    return (
        <>
            <DeleteAddress
                setUpdated={setUpdated}
                user={user}
                address={address}
                open={deleteModal} 
                onClose={handleDeleteModal} 
            />
            <Modal size="xl" opened={open} onClose={handleClose} title={isEmpty(address) ? 'Create Address' : 'Edit Address'}>
                {warning && (
                    <Alert className={styles.alert} color="yellow" title="Warning">
                        Your changes are not saved. Clicking cancel or close again will cause you to lose your chances.
                    </Alert>
                )}
                {error.length > 0 && (
                    <Alert className={styles.alert} color="red" title="Error logging in">
                        {error}
                    </Alert>
                )}
                <LoadingOverlay visible={creeateLoading || updateLoading} />
                <form onSubmit={form.onSubmit(submit)}>
                    <input type="hidden" {...form.getInputProps('userId')} />
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                className={styles.input}
                                withAsterisk
                                label="Address 1"
                                placeholder="Your street name"
                                type="text"
                                {...form.getInputProps('address1')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput
                                className={styles.input}
                                label="Address 2"
                                placeholder="Your apartment number, building number, etc"
                                type="text"
                                {...form.getInputProps('address2')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                className={styles.input}
                                withAsterisk
                                label="City"
                                placeholder="Your city"
                                type="text"
                                {...form.getInputProps('city')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                className={cn(styles.input, styles.uppercase)}
                                withAsterisk
                                label="State"
                                placeholder="Your state - ex: OH"
                                type="text"
                                maxLength={2}
                                {...form.getInputProps('state')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                className={styles.input}
                                withAsterisk
                                label="Zip Code"
                                placeholder="Your zip code"
                                maxLength={5}
                                type="text"
                                {...form.getInputProps('zip')}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Checkbox
                                className={cn(styles.input, styles.noMargin)}
                                label="Set as Default Address"
                                checked={form.values.default}
                                {...form.getInputProps('default')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Group position="right">
                        {address && (
                            <Button onClick={() => setDeleteModal(true)} variant="light" color="turqoise">
                                Delete
                            </Button>
                        )}
                        <Button onClick={handleClose} variant="light" color="red">
                            Cancel
                        </Button>
                        <Button color="green" type="submit">
                            Save Address
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
};

export default AddressForm;