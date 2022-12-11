import { Container, Title, Text, Button, Grid, Group } from "@mantine/core";

import MantineStyles from "@/layouts/MantineStyles";
import Logo from '@/images/logo.png';

import styles from './styles.module.scss';

const Maintenance = () => {
    return (
        <MantineStyles>
            <section className={styles.maintenance}>
                <Container>
                    {/* // eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.image} src={Logo.src} alt="Solo & Chewie Creations Logo" />
                    <Title className={styles.title} order={1} align="center">Website Currently in Progress</Title>
                    <Text align="center" className={styles.text} weight="light">
                        Thank you for expressing interest in our products! We are currently undergoing a major
                        website redesign, and our website is currently down for a short while. However, you can 
                        still purchase your home-made creations from our facebook page!
                    </Text>
                    <Group position="center" align="center">
                        <Button 
                            href="https://www.facebook.com/soloandchewiecreations/" 
                            component="a" 
                            role="link" 
                            color="green"
                        >
                            Shop on Facebook
                        </Button>
                        <Button 
                            href="mailto:kmorr268@gmail.com" 
                            component="a" 
                            role="link" 
                            variant="light" 
                            color="green"
                        >
                            Contact Us
                        </Button>
                    </Group>
                </Container>
            </section>
        </MantineStyles>
    )
};

export default Maintenance;