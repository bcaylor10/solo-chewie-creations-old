import { Modal, Button, Text, LoadingOverlay, Group } from '@mantine/core';

import styles from './styles.module.scss';

interface IConfirmModal {
    open: boolean;
    onConfirm: any;
    onClose: any;
    title: string;
    content: string;
    isLoading: boolean;
};

const ConfirmModal = ({ open, onConfirm, onClose, title, content, isLoading }: IConfirmModal) => {
    return (
        <Modal
            onClose={onClose}
            opened={open}
            title={title}
            zIndex={999999}
        >
            <LoadingOverlay color="green" visible={isLoading} />
            <Text className={styles.text} size="sm">{content}</Text>
            <Group position="right">
                <Button color="red" variant="light" onClick={onClose}>Cancel</Button>
                <Button color="green" onClick={onConfirm}>Confirm</Button>
            </Group>
        </Modal>
    )
};

export default ConfirmModal;