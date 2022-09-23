import { Header as MantineHeader, Container, Grid, MediaQuery, Group, Burger  } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

import { DesktopMenu, UserMenu } from "./Navigation";
import Logo from '@/images/logo.png';
import { useIsAdminRoute } from "util/hooks";

import styles from './styles.module.scss';

const Header = () => {
    const isAdminRoute = useIsAdminRoute();

    return (
        <MantineHeader height={70} p="sm" className={styles.header}>
            <Container className={styles.container} fluid>
                <Grid align="center" justify="space-between">
                    <Grid.Col span={4} className={styles.logoContainer}>
                        <Link href="/">
                            <a className={styles.logo}>
                                <h1>
                                    <Image 
                                        layout="fixed" 
                                        src={Logo} 
                                        alt="Go to home" 
                                        height={55} 
                                        width={70} 
                                    />
                                </h1>
                            </a>
                        </Link>
                        {!isAdminRoute && <DesktopMenu />}
                    </Grid.Col>
                    <Grid.Col span={8} className={styles.userMenuContainer}>
                        <UserMenu />
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineHeader>
    )
};

export default Header;