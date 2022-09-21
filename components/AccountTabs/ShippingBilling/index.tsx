import { useState } from 'react';
import { Tabs, SegmentedControl, Transition } from "@mantine/core";

import { IAccountTab } from "..";
import Addresses from './Addresses';
import Billing from './Billing';

import styles from '../styles.module.scss';

const ShippingBilling = ({ panelName, user }: IAccountTab) => {
    const [ value, setValue ] = useState<string>('address');
    const controlData = [
        { label: 'Addresses', value: 'address' },
        { label: 'Billing', value: 'billing' }
    ];

    return (
        <Tabs.Panel value={panelName} className={styles.accountTab}>
            <SegmentedControl
                value={value}
                onChange={setValue}
                data={controlData}
                fullWidth
                color="turqoise"
            />
            <Transition mounted={value === 'address'} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={{ ...style, paddingTop: '20px' }}>
                        <Addresses user={user} />
                    </div>
                )}
            </Transition>
            <Transition mounted={value === 'billing'} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={{ ...style, paddingTop: '20px' }}>
                        <Billing user={user} />
                    </div>
                )}
            </Transition>
        </Tabs.Panel>
    )
};

export default ShippingBilling;