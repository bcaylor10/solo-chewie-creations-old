import { Divider, Title, List } from '@mantine/core';
import cn from 'classnames';

import styles from './styles.module.scss';

interface IProductListSidebar {
    orderBy: number;
    setOrderBy: any;
    collection: string;
    setCollection: any;
    showCollections: boolean;
}

const ProductListSidebar = ({ 
    orderBy, 
    setOrderBy, 
    collection,
    setCollection,
    showCollections = false 
}: IProductListSidebar) => {
    const filters: string[] = [ 'Most Recent', 'Price Low to High', 'Price High to Low' ];

    return (
        <aside className={styles.productListSidebar}>
            <Title order={3} size={18}>Filter Products</Title>
            <Divider className={styles.divider} />
            <nav>
               <List listStyleType="none" className={styles.filterList}>
                    {showCollections && (
                        <>
                            <List.Item  
                                onClick={() => setCollection('all')} 
                                className={cn(styles.filter, collection === 'all' && styles.active)}
                            >
                                All Products
                            </List.Item>
                            <List.Item  
                                onClick={() => setCollection('hats')} 
                                className={cn(styles.filter, collection === 'hats' && styles.active)}
                            >
                                Hats
                            </List.Item>
                            <List.Item  
                                onClick={() => setCollection('scarves')} 
                                className={cn(styles.filter, collection === 'scarves' && styles.active)}
                            >
                                Scarves
                            </List.Item>
                            <List.Item  
                                onClick={() => setCollection('head-bands')} 
                                className={cn(styles.filter, collection === 'head-bands' && styles.active)}
                            >
                                Head Bands
                            </List.Item>
                            <Divider className={styles.divider} />
                        </>
                    )}
                    {filters.map((f, i) => {
                        return (
                            <List.Item 
                                key={i} 
                                onClick={() => setOrderBy(i)} 
                                className={cn(styles.filter, orderBy === i && styles.active)}
                            >
                                {f}
                            </List.Item>
                        )
                    })}
               </List>
            </nav>
        </aside>
    )
};

export default ProductListSidebar;