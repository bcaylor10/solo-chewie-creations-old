import { Button, Group } from '@mantine/core';
import { FiPlusCircle } from 'react-icons/fi';

import styles from './styles.module.scss';

interface IAddButton {
    className?: string;
    onClick: any;
    text?: string;
    color?: string;
}

const AddButton = ({ className, onClick, text, color }: IAddButton) => {
    return (
        <Button 
            color={color || 'turqoise'}
            onClick={onClick}
            className={className}
        >
            <Group className={styles.content}>
                <FiPlusCircle size={16} />
                <span>{text || 'Add'}</span>
            </Group>
        </Button>
    )
};

export default AddButton;