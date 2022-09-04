import { useEffect } from "react";
import { Header as MantineHeader, Container, Grid, Button, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

import AvatarButton from "./AvatarButton";

interface IHeader {
    setLoading: any;
}

const Header = ({ setLoading }: IHeader) => {
    const { user, isLoading, loginWithRedirect } = useAuth0();

    console.log(user)

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [ setLoading, isLoading ]);

    return (
        <MantineHeader height={60} p="sm">
           <Container>
                <Grid align="center" justify="flex-end">
                    <Grid.Col span={6}>
                        <Group position="right">
                            {user ? <AvatarButton user={user} /> : (
                                <Button color="green" onClick={() => loginWithRedirect()}>Log In</Button>
                            )}
                        </Group>
                    </Grid.Col>
                </Grid>
           </Container>
        </MantineHeader>
    )
};

export default Header;