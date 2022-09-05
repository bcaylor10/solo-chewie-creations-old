/* eslint-disable @next/next/no-img-element */
import { Container, Text, Footer as MantineFooter, Group, Button, Center, MediaQuery } from "@mantine/core";
import { FiFacebook } from 'react-icons/fi';
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useMediaQuery } from '@mantine/hooks';

import Logo from '@/images/logo.png';
import { setContactModal } from "@/redux/site";

import styles from './styles.module.scss';

const Footer = () => {
    const year = new Date().getFullYear();
    const dispatch = useDispatch();
    const matches = useMediaQuery('(max-width: 768px)');

    return (
        <MantineFooter withBorder={false} height={265} className={styles.footer} p="xl">
            <Container size="xl">
                <Center style={{ marginBottom: '30px' }}>
                    <Image 
                        src={Logo} 
                        alt="Solo and Chewie Creations Logo" 
                        height={130} 
                        width={150} 
                    />
                </Center>
                <Group position={matches ? 'center' : 'apart'}>
                    <Text size="xs">&copy; {year} Solo and Chewie Creations. All rights reserved.</Text>
                    <Group position="right">
                        <Link href="https://www.facebook.com/soloandchewiecreations/">
                            <a target="_blank" className={styles.facebookIcon} role="link" aria-label="Facebook Page Link">
                                <FiFacebook />
                            </a>
                        </Link>
                        <Button
                            onClick={() => dispatch(setContactModal(true))}
                            variant="light" 
                            color="green"
                        >
                            Contact Us
                        </Button>
                    </Group>
                </Group>
            </Container>
        </MantineFooter>
    )
};

export default Footer;