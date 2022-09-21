import { useEffect, useState } from "react";
import { Tabs, SegmentedControl, Transition } from "@mantine/core";

import { IAccountTab } from "..";
import BasicInfoForm from "./BasicInfoForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";

import styles from '../styles.module.scss';

const Profile = ({ panelName, user }: IAccountTab) => {
    const [ value, setValue ] = useState<string>('basic');
    const controlData = [
        { label: 'Basic Info', value: 'basic' },
        { label: 'Update Email', value: 'email' },
        { label: 'Update Password', value: 'password' }
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
            <Transition mounted={value === 'basic'} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={{ ...style, paddingTop: '20px' }}>
                        <BasicInfoForm user={user} />
                    </div>
                )}
            </Transition>
            <Transition mounted={value === 'email'} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={{ ...style, paddingTop: '20px' }}>
                        <EmailForm user={user} />
                    </div>
                )}
            </Transition>
            <Transition mounted={value === 'password'} transition="fade" timingFunction="ease">
                {(style) => (
                    <div style={{ ...style, paddingTop: '20px' }}>
                        <PasswordForm />
                    </div>
                )}
            </Transition>
        </Tabs.Panel>
    )
};

export default Profile;