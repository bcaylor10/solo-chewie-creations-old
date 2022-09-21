import { Avatar, UnstyledButton, Group, Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { menuStyles } from "util/helpers";
import routes from "@/routes";
import { IUser } from "@/redux/user";
import { removeUser } from "@/redux/user";
import { setLoading } from "@/redux/site";

import styles from './styles.module.scss';

interface IAvatarButton {
    user: IUser;
}

const AvatarButton = ({ user }: IAvatarButton) => {
    const dispatch = useDispatch();
    const { classes } = menuStyles();
    const router = useRouter();
    const isAdmin = false;

    const handleLogout = async () => {
        dispatch(setLoading(true));
        dispatch(removeUser());
        await router.push('/');
        dispatch(setLoading(false));
    };
    
    return (
        <Menu classNames={classes} shadow="md" position="bottom-end" width={170}>
            <Menu.Target>
                <UnstyledButton className={styles.avatarButton}>
                    <Group align="center">
                        <Avatar
                            size="sm"
                            radius="xl" 
                            variant="filled" 
                            color="green" 
                            src={user.photoURL} 
                            alt="Profile Icon" 
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {isAdmin && <Menu.Item component={NextLink} href={routes.admin.base}>Admin Panel</Menu.Item>}
                <Menu.Divider />
                <Menu.Item component={NextLink} href={routes.account.base}>Account</Menu.Item>
                <Menu.Item component={NextLink} href={routes.account.orderHistory}>Order History</Menu.Item>
                <Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
};

export default AvatarButton;