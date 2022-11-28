import { useState } from "react";
import { TextInput, PasswordInput, Button, Alert, Group, UnstyledButton, Text } from "@mantine/core";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { firebaseAuth } from "util/firebase";
import validators from 'util/validators';
import { IForm } from '..';

import styles from '../styles.module.scss';

interface ILoginData {
    email: string;
    password: string;
    passwordConfirm: string;
}

const SignupForm = ({ setCurrentForm, setLoading }: IForm) => {
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const schema = Yup.object().shape({
        email: validators.email,
        password: validators.password,
        passwordConfirm: validators.passwordConfirm
    });
    const form = useForm<ILoginData>({
        validate: yupResolver(schema),
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
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
                className="input"
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                type="email"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                className="input"
                withAsterisk
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('password')}
            />
            <PasswordInput
                className="input"
                withAsterisk
                label="Confirm Password"
                placeholder="Confirm password"
                {...form.getInputProps('passwordConfirm')}
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