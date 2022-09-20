import { useState } from "react";
import { TextInput, PasswordInput, Button, Alert, Group, UnstyledButton, Text } from "@mantine/core";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import * as Yup from 'yup';

import { firebaseAuth } from "util/firebase";
import validators from 'util/validators';
import { setUser } from "@/redux/user";
import { IForm } from '..';

import styles from '../styles.module.scss';

interface ILoginData {
    email: string;
    password: string;
}

const SignupForm = ({ setCurrentForm, setLoading }: IForm) => {
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const dispatch = useDispatch();
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

    const submit = (data: any) => {
        setLoading(true);
        setSuccess(false);
        setError('');

        createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
            .then((userCredential) => {
                return sendEmailVerification(userCredential.user);
            }).then(() => {
                setLoading(false);
                setSuccess(true);
                form.reset();
            })
            .catch((err) => {
                console.log(err.code)
                setLoading(false);
                setError(err.message);
            })
    };

    return (
        <form onSubmit={form.onSubmit(submit)}>
            {error.length > 0 && (
                <Alert className={styles.alert} color="red" title="Error signing up">
                    {error}
                </Alert>
            )}
            {success && (
                <Alert className={styles.alert} color="green" title="Signup successful">
                    Your account has been created! In order to use your account, please verify your email address. 
                    An email to do so was sent to your provided email.
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
                <UnstyledButton onClick={() => setCurrentForm(0)}>
                    <Text size="sm" underline>Log In</Text>
                </UnstyledButton>
                <Button variant="filled" color="green" type="submit">
                    Signup
                </Button>
            </Group>
        </form>
    )
};

export default SignupForm;