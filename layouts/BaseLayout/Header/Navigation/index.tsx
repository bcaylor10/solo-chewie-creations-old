import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import routes from "@/routes";

export interface ILink {
    href: string;
    text: string;
}

export interface ILinks {
    link: ILink;
    sub?: ILink[];
}

export const links: ILinks[] = [
    { 
        link: { href: '#', text: 'Products' },
        sub: [
            { href: routes.products.all, text: 'All Products' },
            { href: routes.products.hats, text: 'Hats' },
            { href: routes.products.scarves, text: 'Scarves' },
            { href: routes.products.headBands, text: 'Head Bands' }
        ]
    },
    { link: { href: routes.about, text: 'About' } }
];

export const  isCurrentPage = (router: any, href: string, subLinks?: ILink[]): boolean => {
    const sub = subLinks ? subLinks.map((s: ILink) => s.href) : [];
    let isCurrent = false;

    if (router.pathname === href || sub.includes(router.pathname)) {
        isCurrent = true;
    }

    return isCurrent;
};


export { DesktopMenu, MobileMenu, UserMenu };