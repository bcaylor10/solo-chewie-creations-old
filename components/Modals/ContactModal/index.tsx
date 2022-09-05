import { Modal, Button, Group, TextInput, Textarea, Text, Divider } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';

import { setContactModal } from '@/redux/site';
import { IContactData, useSendEmail } from '@/queries/contact';

import styles from './styles.module.scss';

const ContactModal = () => {
    const open = useSelector((store: any) => store.site.contactModal);
    const { mutate: sendEmail, isLoading } = useSendEmail();
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

    const submit = (data: IContactData) => {
        // do loading
        const res = sendEmail(data);
        console.log(res);
    };

    return (
        <Modal 
            opened={open} 
            onClose={handleClose} 
            title="Contact Us"
            centered
            size="lg"
        >
            <Text size="sm" className={styles.description}>
                Have a question, and issue, a large order, or just want to leave us a review? Fill out this form
                and we will get back to you as soon as possible!
            </Text>
            <Divider className={styles.divider} />
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="Name"
                    placeholder="Your name"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    className={styles.input}
                    label="Phone"
                    placeholder="Your phone number"
                    {...form.getInputProps('phone')}
                />
                <Textarea
                    className={styles.input}
                    withAsterisk
                    label="Message"
                    placeholder="Your message to us"
                    {...form.getInputProps('message')}
                />
                <Group position="right">
                    <input type="submit" style={{ display: 'none' }} />
                    <Button variant="subtle" color="red" onClick={handleClose}>
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