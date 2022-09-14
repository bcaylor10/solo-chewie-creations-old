import { Tabs } from "@mantine/core";

import { IAccountTab } from "..";

import styles from '../styles.module.scss';

const ShippingBilling = ({ panelName, user }: IAccountTab) => {
    return (
        <Tabs.Panel value={panelName} className={styles.accountTab}>
            ShippingBilling Tab
        </Tabs.Panel>
    )
};

export default ShippingBilling;