import { Button, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useUpdatePassword } from "react-firebase-hooks/auth";
import { showNotification } from '@mantine/notifications';

import validators from 'util/validators';
import { firebaseAuth } from 'util/firebase';

import styles from '../../styles.module.scss';

interface IFormData {
    password: string;
    passwordConfirm: string;
}

const PasswordForm = () => {
    const [ updatePassword, updating, error ] = useUpdatePassword(firebaseAuth);
    const schema = Yup.object().shape({
        password: validators.password,
        passwordConfirm: validators.passwordConfirm
    });
    const form = useForm<IFormData>({
        validate: yupResolver(schema),
        initialValues: {
            password: '',
            passwordConfirm: ''
        }
    });

    const submit = (data: IFormData) => {
        form.reset();
        updatePassword(data.password) .then(() => {
            if (error) throw new Error;
            showNotification({
                title: 'Success!',
                message: 'Password updated successfully',
                color: 'green',
            });
        }).catch((err) => {
            showNotification({
                title: 'Error!',
                message: 'Error updating password',
                color: 'red',
            });
        })
    };

    return (
        <>
            <form onSubmit={form.onSubmit(submit)}>
                <PasswordInput
                    className="input"
                    withAsterisk
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    className="input"
                    withAsterisk
                    label="Confirm Password"
                    placeholder="Confirm password"
                    {...form.getInputProps('passwordConfirm')}
                />
                <Button color="green" type="submit" loading={updating} loaderPosition="right">
                    Update Password
                </Button>
            </form>
        </>
    )
};

export default PasswordForm;