import { Modal, Button, Group, Image } from '@mantine/core';

import { IImage } from 'util/aws';

import styles from './styles.module.scss';

interface IImageModal {
    open: boolean;
    onClose: any;
    onConfirm: any;
    image: IImage | null;
};

const ImageModal = ({ open, onClose, image, onConfirm }: IImageModal) => {
    if (!image) return <></>;
    
    return (
        <Modal
            onClose={onClose}
            opened={open}
            title={image.name}
            size="xl"
        >
            <Image src={image.url} alt={image.name} className={styles.image} />
            <Group position="right">
                <Button color="red" variant="light" onClick={onClose}>Close</Button>
                <Button color="green" onClick={onConfirm}>Delete</Button>
            </Group>
        </Modal>
    )
};

export default ImageModal;