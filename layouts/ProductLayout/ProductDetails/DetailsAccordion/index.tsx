import { Accordion } from "@mantine/core";

import { IProductLayout } from "../..";

import styles from './styles.module.scss';

const DetailsAccordion = ({ product }: IProductLayout) => {
    if (!product?.care && !product?.details) return <></>;

    return (
        <Accordion radius="xs" chevronPosition="left" multiple>
            {product?.care && (
                <Accordion.Item value="care" >
                    <Accordion.Control className={styles.accordionControl}>
                        Care
                    </Accordion.Control>
                    <Accordion.Panel>
                        Colors, fonts, shadows and many other parts are customizable to fit your design needs
                    </Accordion.Panel>
                </Accordion.Item>
            )}
            {product?.details && (
                <Accordion.Item value="details">
                    <Accordion.Control className={styles.accordionControl}>
                        Details
                    </Accordion.Control>
                    <Accordion.Panel>
                        Configure components appearance and behavior with vast amount of settings or overwrite 
                        any part of component styles
                    </Accordion.Panel>
                </Accordion.Item>
            )}  
        </Accordion>
    )
};

export default DetailsAccordion;