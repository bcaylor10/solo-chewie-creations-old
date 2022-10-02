import { useEffect, useState } from 'react';
import { Grid, Image, Card, Title, Text, Group, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { getAllImages, IImage } from 'util/aws';
import { UploadImagesModal } from '@/components/Modals';
import Loader from '@/components/Loader';

import styles from './styles.module.scss';

interface IImageSelector {
    onClick: any;
    onClickTitle: string;
    title?:string;
    showTitle?: boolean;
}

const ImageSelector = ({ onClick, onClickTitle, title, showTitle = false }: IImageSelector) => {
    const [ images, setImages ] = useState<IImage[]>([]);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getAllImages()
        .then((data) => {
            setImages(data);
            setLoading(false);
        })
        .catch(() => {
            showNotification({
                title: 'Error!',
                message: 'Error getting images',
                color: 'red'
            });
            setLoading(false);
        });
    }, [ ]);

    return (
        <div className={styles.imageSelector}>
            <Loader loading={loading} absolute={true} />
            {showTitle && (
                <Group className={styles.titleGroup} align="center">
                    <Title order={2} className={styles.title}>{title}</Title>
                    <Button color="green" onClick={() => setShowModal(true)}>Add Image(s)</Button>
                </Group>
            )}
            <Grid gutter="xl">
                {images.length > 0 && images.map((img, i: number) => (
                    <Grid.Col span={3}key={i}>
                        <Card shadow="md" className={styles.imageCard}>
                            <div className={styles.image}>
                                <img src={img.url} alt={img.name} />
                                <div className={styles.hover} role="button" onClick={() => onClick(img)}>
                                    <Text align="center" size="sm" className={styles.hoverText}>
                                        {onClickTitle}
                                    </Text>
                                </div>
                            </div>
                            <div className={styles.caption}>
                                <Text align="center" size="sm">
                                    {img.name}
                                </Text>
                            </div>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
            <UploadImagesModal open={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default ImageSelector;