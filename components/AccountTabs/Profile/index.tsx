import { Tabs, Button, Group, TextInput, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useAuth0 } from '@auth0/auth0-react';

import { IAccountTab } from "..";
import { useUpdateUser } from '@/queries/user';

import styles from '../styles.module.scss';

interface IProfileData {
    given_name: string;
    family_name: string;
    email: string;
}

// TODO: add email verification

const Profile = ({ panelName, user }: IAccountTab) => {    
    const { getAccessTokenSilently } = useAuth0();
    const { mutate: updateUser, isLoading, status } = useUpdateUser();

    const form = useForm<IProfileData>({
        initialValues: {
            given_name: user?.given_name || '',
            family_name: user?.family_name || '',
            email: user?.email || '',
        },
        validate: {
            given_name: (value) => value.length > 0 ? null : 'First name required',
            family_name: (value) => value.length > 0 ? null : 'Last name required',
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Valid email required'),
        }
    });

    const submit = (data: IProfileData) => {
        const submitData = data;
        getAccessTokenSilently({ scope: 'update:current_user' }).then((data) => {
            updateUser({
                id: user?.sub,
                data: submitData,
                token: data
            })
        }).catch((err) => console.log(err))
        
    };

    // console.log(user);
    
    return (
        <Tabs.Panel value={panelName} className={styles.accountTab}>
            <form onSubmit={form.onSubmit(submit)}>
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="First Name"
                    placeholder="First Name"
                    {...form.getInputProps('given_name')}
                />
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="Last Name"
                    placeholder="Last Name"
                    {...form.getInputProps('family_name')}
                />
                <TextInput
                    className={styles.input}
                    withAsterisk
                    label="Primary Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <Button variant="light" color="green" type="submit">
                    Save Profile
                </Button>
            </form>
        </Tabs.Panel>
    )
};

export default Profile;