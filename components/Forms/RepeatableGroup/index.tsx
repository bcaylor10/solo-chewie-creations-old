import { Grid, TextInput, ActionIcon, Group, Button } from '@mantine/core';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import cn from 'classnames';

import { AddButton } from '@/components/Buttons';

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
            <div className={styles.addableContainer}>
                {fields.map((f: string, i: number) => (
                    <Grid key={i} align="center" className={styles.addableGroup}>
                        <Grid.Col span={11}>
                            <TextInput
                                className={cn('input', styles.addableInput)}
                                style={{ marginBottom: 0 }}
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
            </div>
            <Group position="left">
                <AddButton
                    onClick={() => form.insertListItem(name, '')}
                    className={styles.groupButton}
                />
            </Group>
        </>
    )
};

export default RepeatableGroup;