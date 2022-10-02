import { useState } from "react";
import { showNotification } from "@mantine/notifications";

import { ImageSelector } from "@/components/Forms";
import { IImage, deleteImage } from "util/aws";
import { ConfirmModal, ImageModal } from "@/components/Modals";
import { setLoading } from "@/redux/site";

const MediaLibrary = () => {
    const [ showConfimModal, setShowConfirmModal ] = useState<boolean>(false);
    const [ showImageModal, setShowImageModal ] = useState<boolean>(false);
    const [ currentImage, setCurrentImage ] = useState<IImage|null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleDelete = () => {
        if (!currentImage) return;
        setIsLoading(true);

        deleteImage(currentImage.name)
        .then(() => {
            setIsLoading(false);
            setShowConfirmModal(false);
            setShowImageModal(false);

            showNotification({
                title: 'Success!',
                message: 'Successfully deleted image',
                color: 'green'
            });
        })
        .catch(() => {
            setIsLoading(false);
            setShowConfirmModal(false);

            showNotification({
                title: 'Error!',
                message: 'Error deleting image',
                color: 'red'
            });
        })
    };

    return (
        <>
            <ImageSelector 
                onClick={(img: IImage) => {
                    setCurrentImage(img);
                    setTimeout(() => {
                        setShowImageModal(true);
                    }, 0);
                }} 
                onClickTitle="View Image" 
                title="Media Library"
            />
            <ConfirmModal
                open={showConfimModal}
                onClose={() => setShowConfirmModal(false)}
                content="Are you sure you want to delete this image?"
                title="Delete Image"
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
            <ImageModal 
                open={showImageModal} 
                onClose={() => {
                    setShowImageModal(false);
                    setTimeout(() => {
                        setCurrentImage(null)
                    }, 200);
                }} 
                image={currentImage}
                onConfirm={() => setShowConfirmModal(true)}
            />
        </>
    );
};

export default MediaLibrary;