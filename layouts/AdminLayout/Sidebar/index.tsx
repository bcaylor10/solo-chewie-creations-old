import { Navbar, NavLink, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiUser, FiTag, FiDollarSign, FiHome, FiArchive, FiStar, FiImage } from 'react-icons/fi';

import routes from "@/routes";

import styles from './styles.module.scss';

const Sidebar = () => {
    const router = useRouter();
    const { admin } = routes;

    return (
        <Navbar
            width={{ base: 300 }} 
            p="xl"
        >
            <Link href={admin.base} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Dashboard" 
                    active={router.pathname === admin.base} 
                    icon={
                        <ActionIcon color="green" variant="light">
                            <FiHome />
                        </ActionIcon>
                    }
                />
            </Link>
            <Link href={admin.orders.all} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Orders" 
                    active={router.pathname === admin.orders.all}
                    icon={
                        <ActionIcon color="yellow" variant="light">
                            <FiArchive />
                        </ActionIcon>
                    } 
                />
            </Link>
            <Link href={admin.customers.all} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Customers" 
                    active={router.pathname === admin.customers.all}
                    icon={
                        <ActionIcon color="red" variant="light">
                            <FiUser />
                        </ActionIcon>
                    } 
                />
            </Link>
            <Link href={admin.products.all} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Products" 
                    active={router.pathname === admin.products.all} 
                    icon={
                        <ActionIcon color="blue" variant="light">
                            <FiTag />
                        </ActionIcon>
                    } 
                />
            </Link>
            <Link href={admin.promos.all} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Promos" 
                    active={router.pathname === admin.promos.all} 
                    icon={
                        <ActionIcon color="lime" variant="light">
                            <FiDollarSign />
                        </ActionIcon>
                    } 
                />
            </Link>
            <Link href={admin.testimonials.all} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Testimonials" 
                    active={router.pathname === admin.testimonials.all} 
                    icon={
                        <ActionIcon color="teal" variant="light">
                            <FiStar />
                        </ActionIcon>
                    } 
                />
            </Link>
            <Link href={admin.mediaLibrary} passHref>
                <NavLink 
                    className={styles.navLink}
                    component="a" 
                    label="Media Library" 
                    active={router.pathname === admin.mediaLibrary} 
                    icon={
                        <ActionIcon color="blue" variant="light">
                            <FiImage />
                        </ActionIcon>
                    } 
                />
            </Link>
        </Navbar>
    )
};

export default Sidebar;