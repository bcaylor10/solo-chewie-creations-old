import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image'
import cn from 'classnames';
import { Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";

import Logo from './solo-chewie-creations-logo.png';
import { menuStyles } from "util/helpers";
import routes from '@/routes';

import styles from './styles.module.scss';

interface ILink {
    href: string;
    text: string;
}

interface ILinks {
    link: ILink;
    sub?: ILink[];
}

const Navigation = () => {
    const { classes } = menuStyles();
    const router = useRouter();
    const links: ILinks[] = [
        { 
            link: { href: '#', text: 'Products' },
            sub: [
                { href: routes.products.all, text: 'All Products' },
                { href: routes.products.hats, text: 'Hats' },
                { href: routes.products.scarves, text: 'Scarves' },
                { href: routes.products.headBands, text: 'Head Bands' }
            ]
        },
        { link: { href: routes.products.popular, text: 'Popular' } },
        { link: { href: routes.about, text: 'About' } }
    ];

    const isCurrentPage = (href: string, subLinks?: ILink[]): boolean => {
        const sub = subLinks ? subLinks.map((s: ILink) => s.href) : [];
        let isCurrent = false;

        if (router.pathname === href || sub.includes(router.pathname)) {
            isCurrent = true;
        }

        return isCurrent;
    };

    return (
        <div className={styles.navContainer}>
            <Link href="/">
                <span>
                    <Image src={Logo} alt="Go to home" height={70} width={70} className={styles.logo} />
                </span>
            </Link>
            <nav>
                <ul className={styles.list}>
                    {links.map(({ link, sub }: ILinks, i: number) => {
                        const { href, text } = link;
                        return (
                            <li key={i} className={cn(styles.listItem, isCurrentPage(href) && styles.active)}>
                                {sub ? (
                                    <Menu 
                                        classNames={classes} 
                                        trigger="click" 
                                        openDelay={100} 
                                        shadow="md" 
                                        width={150} 
                                        position="bottom-start"
                                    >
                                        <Menu.Target>
                                            <span className={cn(styles.link, isCurrentPage(href, sub) && styles.active)}>
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
        </div>
    )
};

export default Navigation;