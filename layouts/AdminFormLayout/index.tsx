import { Title, Grid } from '@mantine/core';

import Loader from '@/components/Loader';

interface IAdminFormLayout {
    children: any;
    loading: boolean;
    title: string;
}

const AdminFormLayout = ({ children, loading, title }: IAdminFormLayout) => {
    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} absolute />
            <Title order={2}>{title}</Title>
            <Grid>
                <Grid.Col span={8}>
                    {children}
                </Grid.Col>
            </Grid>
        </div>
    )
};

export default AdminFormLayout;