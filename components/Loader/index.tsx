import { Loader as MantineLoader, Transition } from "@mantine/core";
import cn from 'classnames';

import styles from './styles.module.scss';

interface ILoader {
    loading: boolean;
    variant?: string;
};

const Loader = ({ loading = false, variant = 'dots' }: ILoader) => {
    return (
        <Transition mounted={loading} transition="fade" timingFunction="ease">
            {(style) => (
                <div style={style} className={styles.loaderContainer}>
                    <MantineLoader color="green" size="xl" variant={variant} className={styles.loader} />
                </div>
            )}
        </Transition>
    );
};

export default Loader;