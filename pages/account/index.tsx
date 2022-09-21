import { Container, Grid, Title, Tabs } from "@mantine/core";
import { FiList, FiUser, FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { useSelector } from "react-redux";

import Loader from '@/components/Loader';
import { OrderHistory, Profile, ShippingBilling, ProductReviews } from '@/components/AccountTabs';

const Account = () => {
    const user = useSelector((store: any) => store.user);
    
    return (
        <section>
            <Container>
                <Title align="center" order={2}>Account Settings</Title>
                <Tabs radius="xs" color="green" variant="pills" orientation="vertical" defaultValue="profile">
                    <Tabs.List>
                        <Tabs.Tab value="order-history" icon={<FiList size={24} />}>Order History</Tabs.Tab>
                        <Tabs.Tab value="profile" icon={<FiUser size={24} />}>Profile</Tabs.Tab>
                        <Tabs.Tab value="shipping-billing" icon={<FiMapPin size={24} />}>Shipping &amp; Billing</Tabs.Tab>
                        <Tabs.Tab value="product-reviews" icon={<FiMessageCircle size={24} />}>Product Reviews</Tabs.Tab>
                    </Tabs.List>
                    
                    <OrderHistory panelName="order-history" user={user} />
                    <Profile panelName="profile" user={user} />
                    <ShippingBilling panelName="shipping-billing" user={user} />
                    <ProductReviews panelName="product-reviews" user={user} />
                </Tabs>
            </Container>
        </section>
    )
};

export default Account;