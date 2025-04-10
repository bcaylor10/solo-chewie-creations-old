import { useState } from 'react';
import { Container, Stepper, Title, Modal, Text, Button, Group } from '@mantine/core';
import { useSelector } from "react-redux";

import { YourCart, Details } from '@/components/Checkout';

import styles from './styles.module.scss';

const Checkout = () => {
    const [ active, setActive ] = useState<number>(0);
    const [ local, setLocal ] = useState<boolean>(false);
    const [ totalPrice, setTotalPrice ] = useState<number>(0.00);
    const [ open, setOpen ] = useState<boolean>(false);
    const [ confirmed, setConfirmed ] = useState<boolean>(false);
    const cart = useSelector((store: any) => store.cart);

    const handleStepClick = (step: number) => {
        if (step > 0 && (cart && cart.cartItems.length === 0)) return;
        if ( step === 1 && !confirmed && local) return setOpen(true);

        setActive(step);
    };

    const handleClose = () => {
        setOpen(false);
        setActive(1);
        setConfirmed(true);
    };

    return (
        <>
            <section>
                <Container>
                    <Group position="apart" align="center" className={styles.titleContainer}>
                        <Title order={2} size="h1" align="center">
                            Checkout
                        </Title>
                        <Button 
                            color="turqoise" 
                            disabled={cart.cartItems.length === 0} 
                            onClick={() => handleStepClick(active + 1)}
                        >
                            Continue
                        </Button>
                    </Group>
                    <Stepper active={active} color="green" onStepClick={handleStepClick}>
                        <Stepper.Step label="Your Cart">
                            <div className={styles.step}>
                                <YourCart 
                                    cart={cart} 
                                    local={local} 
                                    setLocal={setLocal}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}
                                />
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Checkout Details">
                            <div className={styles.step}>
                                <Details cart={cart} local={local} totalPrice={totalPrice} />
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Order Complete">
                        </Stepper.Step>
                    </Stepper>            
                </Container>
            </section>
            <Modal
                opened={open}
                onClose={handleClose}
                title="Warning"
            >
                <Text size="sm" className={styles.warning}>
                    You have selected local pickup. If you fail to show
                    or pick up your order, you will not be refunded. Do you still wish to 
                    pick up your order locally?
                </Text>
                <Group position="right">
                    <Button variant="light" color="red" onClick={() => setOpen(false)}>
                        Change Method
                    </Button>
                    <Button color="green" onClick={handleClose}>
                        I Understand
                    </Button>
                </Group>
            </Modal>
        </>
    )
};

export default Checkout;