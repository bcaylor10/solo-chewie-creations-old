import { Divider, Title, Accordion } from '@mantine/core';

import FilterList from './FilterList';

import styles from './styles.module.scss';

export interface IProductListSidebar {
    sizes: string[];
    orderBy: string;
    setOrderBy: any;
    collection: string;
    setCollection: any;
    size: string;
    setSize: any;
    showCollections: boolean;
}

const ProductListSidebar = ({
    sizes,
    orderBy, 
    setOrderBy, 
    collection,
    setCollection,
    size,
    setSize,
    showCollections = false 
}: IProductListSidebar) => {
    return (
        <aside className={styles.productListSidebar}>
            <div className={styles.title}>
                <Title order={3} size={18}>Filter Products</Title>
                <Divider className={styles.divider} />
            </div>
            <FilterList
                sizes={sizes}
                orderBy={orderBy} 
                setOrderBy={setOrderBy}
                collection={collection}
                setCollection={setCollection}
                size={size}
                setSize={setSize}
                showCollections={showCollections}
            />
            <Accordion className={styles.accordion}>
                <Accordion.Item value="filter-list">
                    <Accordion.Control>Filter Products</Accordion.Control>
                    <Accordion.Panel>
                        <FilterList 
                            sizes={sizes}
                            orderBy={orderBy} 
                            setOrderBy={setOrderBy}
                            collection={collection}
                            setCollection={setCollection}
                            size={size}
                            setSize={setSize}
                            showCollections={showCollections}
                            mobileOnly
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </aside>
    )
};

export default ProductListSidebar;