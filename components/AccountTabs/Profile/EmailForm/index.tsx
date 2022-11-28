import { useEffect } from "react";
import { Button, TextInput, Text } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useUpdateEmail } from "react-firebase-hooks/auth";
import { showNotification } from '@mantine/notifications';

import validators from 'util/validators';
import { firebaseAuth } from 'util/firebase';

import styles from '../../styles.module.scss';

interface IFormData {
    currentEmail: string;
    email: string;
    emailConfirm: string;
}

const EmailForm = ({ user }: any) => {
    const [ updateEmail, updating, error ] = useUpdateEmail(firebaseAuth);
    const schema = Yup.object().shape({
        email: validators.email,
        emailConfirm: validators.emailConfirm
    });
    const form = useForm<IFormData>({
        validate: yupResolver(schema),
        initialValues: {
            currentEmail: '',
            email: '',
            emailConfirm: ''
        }
    });

    const submit = (data: IFormData) => {
        updateEmail(data.email).then(() => {
            if (error) throw new Error;
            showNotification({
                title: 'Success!',
                message: 'Email updated successfully',
                color: 'green',
            });
        }).catch((err) => {
            showNotification({
                title: 'Error!',
                message: 'Error updating email',
                color: 'red',
            });
        })
    };

    useEffect(() => {
        if (user) form.setFieldValue('currentEmail', user.email);
    }, [ user ]);

    return (
        <>
            <form onSubmit={form.onSubmit(submit)}>
                <Text className="input" size="sm">
                    This is the primary email that you will receive emails with. If you&nbsp;
                    <strong><u>did not</u></strong> log in with Google, this is also the email you will
                    log in with. You will continue to log in with the same Google account if you previously
                    did so.
                </Text>
                <TextInput
                    className="input"
                    disabled
                    label="Current Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('currentEmail')}
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
                    withAsterisk
                    label="Confirm Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('emailConfirm')}
                />
                <Button color="green" type="submit" loading={updating} loaderPosition="right">
                    Update Email
                </Button>
            </form>
        </>
    )
};

export default EmailForm;