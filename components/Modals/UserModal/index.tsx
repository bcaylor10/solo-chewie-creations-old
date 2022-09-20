import { useState } from 'react';
import { Modal, LoadingOverlay, Button, Alert, Divider, Group } from "@mantine/core";
import { useSelector, useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { showNotification } from '@mantine/notifications';
import { FcGoogle } from 'react-icons/fc';

import { setUserModal } from "@/redux/site";
import { setUser } from '@/redux/user';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { firebaseAuth } from 'util/firebase';

export interface IForm {
    setCurrentForm: any;
    setLoading: any;
    hideModal?: any;
}

import styles from './styles.module.scss';

const UserModal = () => {
    const [ error, setError ] = useState<string>('');
    const [ currentForm, setCurrentForm ] = useState<number>(0);
    const [ loading, setLoading ] = useState<boolean>(false);
    const open = useSelector((store: any) => store.site.userModal);
    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(setUserModal(false));
        setTimeout(() => {
            setCurrentForm(0);
        }, 200);
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');

        const provider = new GoogleAuthProvider();
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                const userData = result.user;
                const user = {
                    displayName: userData.displayName,
                    email: userData.email,
                    emailVerified: userData.emailVerified,
                    phoneNumber: userData.phoneNumber,
                    photoURL: userData.photoURL,
                    uid: userData.uid
                };

                setLoading(false);
                dispatch(setUser(user));
                handleClose();
                showNotification({
                    title: 'Login successful!',
                    message: user.displayName ? `Welcome, ${user.displayName}` : 'Welcome',
                    color: 'green',
                });
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message);
            })
    };

    return (
        <Modal
            opened={open} 
            onClose={handleClose} 
            title={currentForm === 0 ? 'Log In' : 'Sign Up'}
            size="md"
            padding="xl"
        >
            <LoadingOverlay loaderProps={{ color: 'green', variant: 'dots' }} visible={loading} />
            {error && (
                <Alert className={styles.alert} color="red" title="Error logging in with Google">
                    {error}
                </Alert>
            )}
            {currentForm === 0 && <LoginForm setCurrentForm={setCurrentForm} setLoading={setLoading} hideModal={handleClose} />}
            {currentForm === 1 && <SignupForm setCurrentForm={setCurrentForm} setLoading={setLoading} />}
            <Divider my="xl" label="or" labelPosition='center' />
            <Group position="center">
                <Button variant="outline" onClick={handleGoogleLogin}>
                    <FcGoogle className={styles.icon} />
                    Sign In with Google
                </Button>
            </Group>
            
        </Modal>
    )
};

export default UserModal;