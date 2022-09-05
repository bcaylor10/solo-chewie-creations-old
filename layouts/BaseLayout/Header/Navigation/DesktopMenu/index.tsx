import Link from "next/link";
import { useRouter } from "next/router";
import cn from 'classnames';
import { Menu, Button, MediaQuery } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useDispatch } from "react-redux";

import { menuStyles } from "util/helpers";
import { setContactModal } from "@/redux/site";
import { ILink, ILinks, links, isCurrentPage } from "..";

import styles from './styles.module.scss';

const DesktopMenu = () => {
    const { classes } = menuStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>                   
            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.list}>
                        {links.map(({ link, sub }: ILinks, i: number) => {
                            const { href, text } = link;
                            return (
                                <li key={i} className={cn(styles.listItem, isCurrentPage(router, href) && styles.active)}>
                                    {sub ? (
                                        <Menu 
                                            classNames={classes} 
                                            trigger="hover" 
                                            openDelay={100} 
                                            shadow="md" 
                                            width={150} 
                                            position="bottom-start"
                                        >
                                            <Menu.Target>
                                                <span className={cn(styles.link, isCurrentPage(router, href, sub) && styles.active)}>
                                                    {text}
                                                </span>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                {sub.map(({ href, text }: ILink, i: number) => {
                                                    return (
                                                        <Menu.Item color="green[0]" key={i} component={NextLink} href={href}>
                                                            <span className={styles.subListItem}>{text}</span>
                                                        </Menu.Item>
                                                    )
                                                })}
                                            </Menu.Dropdown>
                                        </Menu>
                                    ) : (
                                        <Link href={href}>
                                            <a className={styles.link}>{text}</a>
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <Button 
                    onClick={() => dispatch(setContactModal(true))} 
                    variant="light" 
                    color="green"
                >
                    Contact Us
                </Button>
            </div>
        </MediaQuery>
    )
};

export default DesktopMenu;