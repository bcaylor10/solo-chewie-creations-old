import { useEffect } from 'react';
import { Modal, Button, Group, TextInput, Textarea, Text, Divider, LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';

import { setContactModal } from '@/redux/site';
import { IContactData, useSendEmail } from '@/queries/contact';

import styles from './styles.module.scss';

const ContactModal = () => {
    const open = useSelector((store: any) => store.site.contactModal);
    const { mutate: sendEmail, isLoading, status } = useSendEmail();
    const dispatch = useDispatch();
    const form = useForm<IContactData>({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        },
        validate: {
            name: (value) => value.length > 0 ? null : 'Name required',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Valid email required'),
            message: (value) => value.length > 0 ? null : 'Message required'
        }
    });

    const handleClose = () => {
        dispatch(setContactModal(false));
        setTimeout(() => {
            form.reset();
        }, 200);
    }

    const submit = (data: IContactData) => sendEmail(data);

    useEffect(() => {
        if (status === 'success') {
            showNotification({
                title: 'Message sent',
                message: `Message successfully sent! We will get back to you soon!`,
                color: 'green',
            });   
            handleClose();
        }
    }, [ status ]);

    return (
        <Modal 
            opened={open} 
            onClose={handleClose} 
            title="Contact Us"
            size="lg"
        >
            <LoadingOverlay loaderProps={{ color: 'green', variant: 'dots' }} visible={isLoading} />
            <Text size="sm" className={styles.description}>
                Have a question, and issue, a large order, or just want to leave us a review? Fill out this form
                and we will get back to you as soon as possible!
            </Text>
            <Divider className={styles.divider} />
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput
                    className="input"
                    withAsterisk
                    label="Name"
                    placeholder="Your name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    className="input"
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    className="input"
                    label="Phone"
                    placeholder="Your phone number"
                    {...form.getInputProps('phone')}
                />
                <Textarea
                    className="input"
                    withAsterisk
                    label="Message"
                    placeholder="Your message to us"
                    {...form.getInputProps('message')}
                />
                <Group position="right">
                    <input type="submit" style={{ display: 'none' }} />
                    <Button variant="light" color="red" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="filled" color="green" type="submit">
                        Send Message
                    </Button>
                </Group>
            </form>
        </Modal>
    )
};

export default ContactModal;