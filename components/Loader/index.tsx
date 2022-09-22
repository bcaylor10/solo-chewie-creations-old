import { Loader as MantineLoader, Transition } from "@mantine/core";
import cn from 'classnames';

import styles from './styles.module.scss';

interface ILoader {
    loading: boolean;
    variant?: string;
    absolute?: boolean;
};

const Loader = ({ loading = false, variant = 'dots', absolute = false }: ILoader) => {
    return (
        <Transition mounted={loading} transition="fade" timingFunction="ease">
            {(style) => (
                <div style={style} className={cn(styles.loaderContainer, absolute && styles.absolute)}>
                    {/* @ts-ignore */}
                    <MantineLoader color="green" size="xl" variant={variant} className={styles.loader} />
                </div>
            )}
        </Transition>
    );
};

export default Loader;