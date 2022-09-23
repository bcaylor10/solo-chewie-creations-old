import { Avatar, UnstyledButton, Group, Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";

import { menuStyles } from "util/helpers";
import routes from "@/routes";

import styles from './styles.module.scss';

interface IAvatarButton {
    user: any;
    signOutUser: any;
}

const AvatarButton = ({ user, signOutUser }: IAvatarButton) => {
    const { classes } = menuStyles();
    const isAdmin = false;
    
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
                {isAdmin && (
                    <>
                        <Menu.Item component={NextLink} href={routes.admin.base}>Admin Panel</Menu.Item>
                        <Menu.Divider />
                    </>
                )}
                <Menu.Item component={NextLink} href={routes.account.profile}>Profile</Menu.Item>
                <Menu.Item component={NextLink} href={routes.account.orderHistory}>Order History</Menu.Item>
                <Menu.Item component={NextLink} href={routes.account.shippingBilling}>Shipping &amp; Billing</Menu.Item>
                <Menu.Item component={NextLink} href={routes.account.productReviews}>Product Reviews</Menu.Item>
                <Menu.Item onClick={signOutUser}>Log Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
};

export default AvatarButton;