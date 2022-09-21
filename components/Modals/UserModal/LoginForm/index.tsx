import { useState } from "react";
import { TextInput, PasswordInput, Button, Alert, Group, UnstyledButton, Text } from "@mantine/core";
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import * as Yup from 'yup';

import { firebaseAuth } from "util/firebase";
import validators from 'util/validators';
import { IForm } from '..';

import styles from '../styles.module.scss';

interface ILoginData {
    email: string;
    password: string;
}

const LoginForm = ({ setCurrentForm, setLoading, hideModal }: IForm) => {
    const [ error, setError ] = useState<string>('');
    const schema = Yup.object().shape({
        email: validators.email,
        password: validators.password
    });
    const form = useForm<ILoginData>({
        validate: yupResolver(schema),
        initialValues: {
            email: '',
            password: ''
        }
    })

    const handleClose = () => {
        hideModal();
        setTimeout(() => {
            form.reset();
            setError('');
        }, 200);
    }

    const submit = (data: any) => {
        setLoading(true);
        setError('');

        signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
            .then((userCredential) => {
                const userData = userCredential.user;
                const user = {
                    displayName: userData.displayName,
                    email: userData.email,
                    emailVerified: userData.emailVerified,
                    phoneNumber: userData.phoneNumber,
                    photoURL: userData.photoURL,
                    uid: userData.uid
                };

                if (!user.emailVerified) {
                    return sendEmailVerification(userData);
                } else {
                    setLoading(false);
                    handleClose();
                    showNotification({
                        title: 'Login successful!',
                        message: user.displayName ? `Welcome, ${user.displayName}` : 'Welcome',
                        color: 'green',
                    });
                }
            })
            .then(() => {
                setLoading(false);
                setError('Please verify your email before logging in');
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            })
    };

    return (
        <form onSubmit={form.onSubmit(submit)}>
            {error.length > 0 && (
                <Alert className={styles.alert} color="red" title="Error logging in">
                    {error}
                </Alert>
            )}
            <TextInput
                className={styles.input}
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                type="email"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                className={styles.input}
                withAsterisk
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
            />
            <Group position="right">
                <UnstyledButton onClick={() => setCurrentForm(1)}>
                    <Text size="sm" underline>Sign Up</Text>
                </UnstyledButton>
                <Button variant="filled" color="green" type="submit">
                    Login
                </Button>
            </Group>
        </form>
    )
};

export default LoginForm;