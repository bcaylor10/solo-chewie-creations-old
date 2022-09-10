import { Accordion } from "@mantine/core";
import { get } from "lodash";

import { IProductLayout } from "../..";

import styles from './styles.module.scss';

const DetailsAccordion = ({ product }: IProductLayout) => {
    if (!get(product, [ 'extras', 'care' ]) && !get(product, [ 'extras', 'details' ])) return <></>;

    return (
        <Accordion radius="xs" chevronPosition="left" multiple>
            {get(product, [ 'extras', 'care' ]) && (
                <Accordion.Item value="care" >
                    <Accordion.Control className={styles.accordionControl}>
                        Care
                    </Accordion.Control>
                    <Accordion.Panel>
                        {get(product, [ 'extras', 'care' ])}
                    </Accordion.Panel>
                </Accordion.Item>
            )}
            {get(product, [ 'extras', 'details' ]) && (
                <Accordion.Item value="details">
                    <Accordion.Control className={styles.accordionControl}>
                        Details
                    </Accordion.Control>
                    <Accordion.Panel>
                        {get(product, [ 'extras', 'details' ])}
                    </Accordion.Panel>
                </Accordion.Item>
            )}  
        </Accordion>
    )
};

export default DetailsAccordion;