import { Grid, TextInput, ActionIcon, Group, Button } from '@mantine/core';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import cn from 'classnames';

import styles from './styles.module.scss';

interface IRepeatableGroup {
    label: string;
    name: string;
    placeholder: string;
    fields: string[];
    form: any;
}

const RepeatableGroup = ({ label, name, placeholder, fields, form }: IRepeatableGroup) => {
    return (
        <>
            <label className={styles.groupLabel} htmlFor={name}>{label}</label>
            {fields.map((f: string, i: number) => (
                <Grid key={i} align="center" className={styles.addableGroup}>
                    <Grid.Col span={11}>
                        <TextInput
                            className={cn(styles.input, styles.addableInput)}
                            withAsterisk
                            placeholder={placeholder}
                            {...form.getInputProps(`${name}.${i}`)}
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <ActionIcon className={styles.deleteButton} color="red" onClick={() => form.removeListItem(name, i)}>
                            <FiTrash size={16} />
                        </ActionIcon>
                    </Grid.Col>
                </Grid>
            ))}
            <Group position="center">
                <Button 
                    color="turqoise"
                    onClick={() => form.insertListItem(name, '')}
                    className={styles.groupButton}
                >
                    <Group className={styles.groupButtonContent}>
                        <FiPlusCircle size={16} />
                        <span>Add</span>
                    </Group>
                </Button>
            </Group>
        </>
    )
};

export default RepeatableGroup;