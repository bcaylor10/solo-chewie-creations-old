import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Burger, Drawer, MediaQuery, NavLink, Button } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { ILink, ILinks, links, isCurrentPage } from '..';
import { setContactModal } from '@/redux/site';

import styles from './styles.module.scss';

const MobileMenu = () => {
    const [ open, setOpen ] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleContact = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(setContactModal(true))
        }, 200)
    }

    return (
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <div>
                <Burger 
                    opened={open}
                    onClick={() => setOpen(!open)}
                    color="green"
                />
                <Drawer
                    opened={open}
                    onClose={() => setOpen(false)}
                    size="full"
                    padding="xl"
                    position="right"
                    lockScroll
                    className={styles.drawer}
                >
                    {links.map(({ link, sub }: ILinks, i: number) => {
                        const { href, text } = link;
                        return (
                            <Link href={href} key={i} passHref>
                                <NavLink 
                                    onClick={() => sub ? null : setOpen(false)}
                                    label={text}
                                    component="a"
                                    active={isCurrentPage(router, href, sub)}
                                    className={styles.link}
                                >
                                    {sub && (
                                        sub.map(({ href, text }: ILink, i: number) => {
                                            return (
                                                <Link href={href} key={i} passHref>
                                                    <NavLink 
                                                        onClick={() => setOpen(false)}
                                                        label={text}
                                                        component="a"
                                                        active={isCurrentPage(router, href)}
                                                        className={styles.link}
                                                    />
                                                </Link>
                                            );
                                        })
                                    )}
                                </NavLink>
                            </Link>
                        )
                    })}
                    <Button 
                        className={styles.button} 
                        fullWidth 
                        variant="light" 
                        color="green" 
                        onClick={handleContact}
                    >
                        Contact Us
                    </Button>
                </Drawer>
            </div>
        </MediaQuery>
    )
};

export default MobileMenu;