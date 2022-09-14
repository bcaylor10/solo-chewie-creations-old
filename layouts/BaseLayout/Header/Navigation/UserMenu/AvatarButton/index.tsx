import { Avatar, UnstyledButton, Group, Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useAuth0 } from "@auth0/auth0-react";

import { menuStyles } from "util/helpers";
import routes from "@/routes";

import styles from './styles.module.scss';

export interface IUser {
    email?: string | undefined;
    email_verified?: boolean | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
    locale?: string | undefined;
    name?: string | undefined;
    nickname?: string | undefined;
    picture?: string | undefined;
    sub?: string | undefined;
    updated_at?: string | undefined;
};

interface IAvatarButton {
    user: IUser;
}

const AvatarButton = ({ user }: IAvatarButton) => {
    const { logout } = useAuth0();
    const { classes } = menuStyles();
    
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
                            src={user.picture} 
                            alt="Profile Icon" 
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component={NextLink} href={routes.account.base}>Account</Menu.Item>
                <Menu.Item component={NextLink} href={routes.account.orderHistory}>Order History</Menu.Item>
                <Menu.Item onClick={() => logout({ returnTo: process.env.NEXT_PUBLIC_DOMAIN })}>Log Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
};

export default AvatarButton;