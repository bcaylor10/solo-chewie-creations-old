import { Container, Text, Footer as MantineFooter, Group, Button, Center } from "@mantine/core";
import { FiFacebook } from 'react-icons/fi';
import Image from "next/image";

import Logo from '@/images/logo.png';

import styles from './styles.module.scss';
import Link from "next/link";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <MantineFooter withBorder={false} height={307} fixed className={styles.footer} p="xl">
            <Container size="xl">
                <Center>
                    <Image src={Logo} alt="Solo and Chewie Creations Logo" height={220} width={200} />
                </Center>
                <Group position="apart">
                    <Text size="xs">&copy; {year} Solo and Chewie Creations. All rights reserved.</Text>
                    <Group position="right">
                        <Link href="https://www.facebook.com/soloandchewiecreations/">
                            <a target="_blank" className={styles.facebookIcon} role="link" aria-label="Facebook Page Link">
                                <FiFacebook />
                            </a>
                        </Link>
                        <Button variant="subtle" color="green">
                            Contact Us
                        </Button>
                    </Group>
                </Group>
            </Container>
        </MantineFooter>
    )
};

export default Footer;