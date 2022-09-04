import { Avatar, UnstyledButton, Group, Text, Menu } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export interface IUser {
    email?: string | undefined;
    email_verified?: boolean | undefined;
    given_name?: string | undefined;
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
    
    return (
        <Menu shadow="md" position="bottom-end" width={150}>
            <Menu.Target>
                <UnstyledButton>
                    <Group align="center">
                        <Avatar radius="xl" variant="filled" color="green" src={user.picture} alt="Profile Icon" />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => logout({ returnTo: process.env.NEXT_PUBLIC_DOMAIN })}>Log Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
};

export default AvatarButton;