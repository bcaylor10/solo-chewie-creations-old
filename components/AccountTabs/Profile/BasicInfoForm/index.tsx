import { useEffect } from "react";
import { Button, TextInput, Badge } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { showNotification } from '@mantine/notifications';

import validators from 'util/validators';
import { firebaseAuth } from 'util/firebase';

import styles from '../../styles.module.scss';

interface IFormData {
    displayName: string;
    email: string;
    photoURL?: string;
}

const BasicInfoForm = ({ user }: any) => {
    const [ updateProfile, updating, error ] = useUpdateProfile(firebaseAuth);
    const schema = Yup.object().shape({
        displayName: validators.displayName,
        email: validators.email,
        phoneNumber: Yup.string(),
        photoURL: Yup.string()
    });
    const form = useForm<IFormData>({
        validate: yupResolver(schema),
        initialValues: {
            displayName: '',
            email: '',
            photoURL: ''
        }
    });

    useEffect(() => {
        if (user) {
            form.setValues({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || ''
            });
        }
    }, [ user ]);

    const submit = (data: IFormData) => {
        updateProfile(data) .then(() => {
            if (error) throw new Error;
            showNotification({
                title: 'Success!',
                message: 'Profile updated successfully. You may need to reload the page to see your changes',
                color: 'green',
            });
        }).catch((err) => {
            showNotification({
                title: 'Error!',
                message: 'Error updating profile',
                color: 'red',
            });
        })
    };

    return (
        <>
            {user?.emailVerified &&  <Badge size="md" style={{ marginBottom: '20px' }}>Email Verified</Badge>}
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="Full Name"
                    placeholder="Your first and last name"
                    {...form.getInputProps('displayName')}
                />
                <TextInput
                    className={styles.input}
                    label="Email"
                    placeholder="your@email.com"
                    disabled
                    description='Update email on "Update Email" tab'
                    {...form.getInputProps('email')}
                />
                <TextInput
                    className={styles.input}
                    label="Profile Image URL"
                    placeholder="URL of the image you'd like to use"
                    {...form.getInputProps('photoURL')}
                />
                <Button color="green" type="submit" loading={updating} loaderPosition="right">
                    Update Info
                </Button>
            </form>
        </>
    )
};

export default BasicInfoForm;