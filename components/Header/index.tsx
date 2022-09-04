import { Header as MantineHeader, Container, Grid } from "@mantine/core";

import UserMenu from "./UserMenu";
import Navigation from './Navigation';

import styles from './styles.module.scss';


const Header = () => {
    return (
        <MantineHeader height={70} p="sm" className={styles.header}>
            <Container className={styles.container} fluid>
                <Grid align="center" justify="space-between">
                    <Grid.Col span={6}>
                        <Navigation />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <UserMenu />
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineHeader>
    )
};

export default Header;