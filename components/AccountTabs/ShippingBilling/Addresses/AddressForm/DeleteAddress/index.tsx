import { useEffect } from 'react';
import { Modal, Text, Group, Button, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { IAddress } from '@/mongo/models/Address';
import { useDeleteAddress } from '@/queries/account/addresses';

import styles from './styles.module.scss';

interface IDeleteModal {
    setUpdated: any;
    user: any;
    address: IAddress | null;
    open: boolean;
    onClose: any;
}

const DeleteModal = ({ setUpdated, user, address, open, onClose }: IDeleteModal) => {
    const { mutate: deleteAddress, isLoading, status } = useDeleteAddress();

    const handleDelete = () => {
        if (!address) return;

        user.getIdToken(true).then((token: string) => {
            deleteAddress({
                userId: user.uid,
                token: token,
                data: address
            });
        })
        .then(() => setUpdated(true))
        .catch(() => {
            showNotification({
                title: 'Error!',
                message: 'Error deleting address',
                color: 'red',
            });
        })
    };

    useEffect(() => {
        if (status === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Successfully deleted address',
                color: 'green',
            });
            onClose(true);
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error deleting address',
                color: 'red',
            });
        }
    }, [ status ]);

    return (
        <Modal zIndex={999999} title="Delete Address" opened={open} onClose={onClose}>
            <LoadingOverlay visible={isLoading} />
            <Text className={styles.deleteText} size="sm">
                Are you sure you want to delete this address? It cannot be undone.
            </Text>
            <Group position="right">
                <Button onClick={onClose} variant="light" color="red">
                    Cancel
                </Button>
                <Button color="green" onClick={handleDelete}>
                    Delete Address
                </Button>
            </Group>
        </Modal>
    )
};

export default DeleteModal;