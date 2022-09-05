import { Header as MantineHeader, Container, Grid, MediaQuery, Group, Burger  } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

import { DesktopMenu, UserMenu } from "./Navigation";
import Logo from '@/images/logo.png';

import styles from './styles.module.scss';

const Header = () => {
    return (
        <MantineHeader height={70} p="sm" className={styles.header}>
            <Container className={styles.container} fluid>
                <Grid align="center" justify="space-between">
                    <Grid.Col span={6} className={styles.logoContainer}>
                        <Link href="/">
                            <a className={styles.logo}>
                                <Image 
                                    layout="fixed" 
                                    src={Logo} 
                                    alt="Go to home" 
                                    height={55} 
                                    width={70} 
                                />
                            </a>
                        </Link>
                        <DesktopMenu />
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