import { Container, Title, Tabs } from "@mantine/core";
import { FiList, FiUser, FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";

import { OrderHistory, Profile, ShippingBilling, ProductReviews } from '@/components/AccountTabs';
import { firebaseAuth } from 'util/firebase';


const Account = () => {
    const [ user ] = useAuthState(firebaseAuth);
    const router = useRouter();
    const { width } = useViewportSize();

    // used for external links and to keep consistency
    const changeRouterQuery = (query: string) => {
        router.push({
            pathname: router.pathname,
            query
        });
    };
    
    return (
        <section>
            <Container>
                <Title align="center" order={2}>Account Settings</Title>
                <Tabs 
                    radius="xs" 
                    color="green"
                    variant="pills" 
                    orientation={width > 768 ? "vertical" : "horizontal"} 
                    defaultValue="profile"
                >
                    <Tabs.List>
                        <Tabs.Tab 
                            value="profile" 
                            icon={<FiUser size={24} />}
                        >
                            Profile
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="order-history" 
                            icon={<FiList size={24} />}
                        >
                            Order History
                        </Tabs.Tab>
                        <Tabs.Tab 
                            value="shipping-billing" 
                            icon={<FiMapPin size={24} />}
                        >
                            Shipping &amp; Billing
                        </Tabs.Tab>
                        <Tabs.Tab 
                            value="product-reviews" 
                            icon={<FiMessageCircle 
                            size={24} />}
                        >
                                Product Reviews
                        </Tabs.Tab>
                    </Tabs.List>
                    
                    <Profile panelName="profile" user={user} />
                    <OrderHistory panelName="order-history" user={user} />
                    <ShippingBilling panelName="shipping-billing" user={user} />
                    <ProductReviews panelName="product-reviews" user={user} />
                </Tabs>
            </Container>
        </section>
    )
};

export default Account;