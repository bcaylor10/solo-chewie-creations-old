import { useEffect } from "react";
import { Header as MantineHeader, Container, Grid } from "@mantine/core";

import UserMenu from "./UserMenu";
import Navigation from './Navigation';

import styles from './styles.module.scss';

interface IHeader {
    loading: boolean;
    setLoading: any;
}

const Header = ({ loading, setLoading }: IHeader) => {

    useEffect(() => {
        if (loading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [ loading ]);

    return (
        <MantineHeader height={70} p="sm" className={styles.header}>
            <Container className={styles.container} fluid>
                <Grid align="center" justify="space-between">
                    <Grid.Col span={6}>
                        <Navigation />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <UserMenu setLoading={setLoading} />
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineHeader>
    )
};

export default Header;