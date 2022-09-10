import { useEffect, useState } from 'react';
import { Center, Container, Grid, Title, Timeline, Text } from '@mantine/core';
import { FiShoppingCart, FiMail, FiSend } from 'react-icons/fi';

import Cycle from './cycle.svg';

import styles from './styles.module.scss';

const OurProcess = () => {
    const [ active, setActive ] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            active === 2 ? setActive(0) : setActive(active + 1);
        }, 3000);
        return () => clearInterval(interval);
      }, [ active ]);

    return (
        <section className={styles.ourProcess}>
            <Container>
                <Title order={2} align="center">Our Process</Title>
                <Grid>
                    <Grid.Col xs={12} sm={8}>
                        <Timeline color="green" active={active} bulletSize={32} lineWidth={2}>
                            <Timeline.Item title="Order Placed" bullet={<FiShoppingCart />}>
                                <Text>
                                    You navigate our website and find the best product for you, request your colors
                                    or further customizations, and check out!
                                </Text>
                            </Timeline.Item>
                            <Timeline.Item title="Order Received" bullet={<FiMail />}>
                                <Text>
                                    We take a look at your order and check to make sure our yarn is available, contact you if
                                    we need to order a special type of yarn, and set to work on your hand-crafted product!
                                </Text>
                            </Timeline.Item>
                            <Timeline.Item title="Order Completion" bullet={<FiSend />}>
                                <Text>
                                    We notify you via email that your order is ready to be picked up or shipped, and will provide you
                                    with a tracking number if available!
                                </Text>
                            </Timeline.Item>
                        </Timeline>
                    </Grid.Col>
                    <Grid.Col xs={12} sm={4} className={styles.iconColumn}>
                        <Cycle role="img" aria-label="Rotating cycle" />
                    </Grid.Col>
                </Grid>
            </Container>
        </section>
    )
};

export default OurProcess;