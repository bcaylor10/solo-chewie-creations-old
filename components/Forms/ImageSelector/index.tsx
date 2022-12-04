import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Grid, Card, Title, Text, Group, Button, Indicator } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FiCheck } from 'react-icons/fi';

import { getAllImages, IImage } from 'util/aws';
import { UploadImagesModal } from '@/components/Modals';
import Loader from '@/components/Loader';

import styles from './styles.module.scss';

interface IImageSelector {
    onClick: any;
    onClickTitle: string;
    selected?: string[];
    title?: string;
}

const ImageSelector = ({ onClick, onClickTitle, selected = [], title = '' }: IImageSelector) => {
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
    }, []);

    return (
        <div className={styles.imageSelector}>
            <Loader loading={loading} absolute={true} />
            {!isEmpty(title) && (
                <Group className={styles.titleGroup} align="center">
                    <Title order={2} className={styles.title}>{title}</Title>
                    <Button color="green" onClick={() => setShowModal(true)}>Add Image(s)</Button>
                </Group>
            )}
            <Grid gutter="xl">
                {images.length > 0 && images.map((img, i: number) => (
                    <Grid.Col span={3}key={i}>
                        <Card shadow="md" className={styles.imageCard}>
                            <Indicator 
                                zIndex={99999}
                                label={<FiCheck />} 
                                disabled={!selected.includes(img.url)}
                                size={30}
                            >
                                <div className={styles.image}>
                                    {/* // eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.url} alt={img.name} />
                                    <div className={styles.hover} role="button" onClick={() => onClick(img)}>
                                        <Text align="center" size="sm" className={styles.hoverText}>
                                            {onClickTitle}
                                        </Text>
                                    </div>
                                </div>
                            </Indicator>
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