import { Tabs } from "@mantine/core";

import { IAccountTab } from "..";

import styles from '../styles.module.scss';

const OrderHistory = ({ panelName, user }: IAccountTab) => {
    return (
        <Tabs.Panel value={panelName} className={styles.accountTab}>
            OrderHistory Tab
        </Tabs.Panel>
    )
};

export default OrderHistory;