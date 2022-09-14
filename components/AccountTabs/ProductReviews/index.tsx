import { Tabs } from "@mantine/core";

import { IAccountTab } from "..";

import styles from '../styles.module.scss';

const ProductReviews = ({ panelName, user }: IAccountTab) => {
    return (
        <Tabs.Panel value={panelName} className={styles.accountTab}>
            ProductReviews Tab
        </Tabs.Panel>
    )
};

export default ProductReviews;