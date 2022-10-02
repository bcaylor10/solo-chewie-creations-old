import { useState } from 'react';
import { Modal, LoadingOverlay } from '@mantine/core';
import FormData from 'form-data';
import { useAuthState } from 'react-firebase-hooks/auth';
import { showNotification } from '@mantine/notifications';

import { ImageUpload } from '../../Forms';
import { uploadImages } from "@/queries/admin";
import { firebaseAuth } from 'util/firebase';
import { setLoading } from '@/redux/site';

interface IUploadImagesModal {
    open: boolean;
    onClose: any;
}

const UploadImagesModal = ({ open, onClose }: IUploadImagesModal) => {
    const [ user ] = useAuthState(firebaseAuth);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    const submit = (images: any) => {
        setIsLoading(true);

        if (!user) {
            setIsLoading(false);
            return showNotification({
                title: 'Error!',
                message: 'Error uploading images',
                color: 'red'
            });
        }
        const formData = new FormData();
        images.forEach((i: any) => formData.append('images', i, i.name));

        user.getIdToken(true)
        .then((token: string) => {
            return uploadImages({
                userId: user.uid,
                token,
                data: formData
            });
        })
        .then(async () => {
            setIsLoading(false); 
            onClose();
            showNotification({
                title: 'Success!',
                message: 'Sucessfully uploaded images',
                color: 'green'
            });
        })
        .catch(() => {
            setIsLoading(false);
            showNotification({
                title: 'Error!',
                message: 'Error uploading images',
                color: 'red'
            })
        });
    };

    return (
        <Modal
            opened={open}
            onClose={onClose}
            title="Upload Images"
            size="xl"
            padding="xl"
        >
            <LoadingOverlay color="green" visible={isLoading} />
            <ImageUpload cancel={onClose} submit={submit} />
        </Modal>
    )
};

export default UploadImagesModal;