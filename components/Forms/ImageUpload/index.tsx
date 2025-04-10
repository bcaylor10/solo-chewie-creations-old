import { useState } from 'react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text, Image, SimpleGrid, Button } from '@mantine/core';
import { FiUploadCloud, FiCloudOff, FiImage } from 'react-icons/fi';

import styles from './styles.module.scss';

interface IImageUpload {
    submit: any;
    cancel: any;
}

const ImageUpload = ({ submit, cancel }: IImageUpload) => {
    const [currentFiles, setCurrentFiles] = useState<FileWithPath[]>([]);

    const previews = currentFiles.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);

        return (
          <Image
            key={index}
            src={imageUrl}
            alt="image-preview"
            imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
          />
        );
    });

    return (
        <>
            <Dropzone
                onDrop={(files) => setCurrentFiles([ ...currentFiles, ...files ])}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                className={styles.imageUpload}
                multiple
            >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <FiUploadCloud size={50} color="blue" />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <FiCloudOff size={50} color="red" />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <FiImage size={50} />
                    </Dropzone.Idle>
                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Group position="right">
                <Button color="red" variant="light" onClick={cancel}>
                    Cancel
                </Button>
                <Button color="green" onClick={() => submit(currentFiles)}>
                    Upload
                </Button>
            </Group>
            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
        </>
    )
};

export default ImageUpload;