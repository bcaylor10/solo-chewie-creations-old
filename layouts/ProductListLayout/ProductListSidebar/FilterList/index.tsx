import { useState, useEffect } from 'react';
import { List, Divider, Button } from '@mantine/core'
import cn from 'classnames';

import { IProductListSidebar } from '..'

import styles from '../styles.module.scss';

interface IFilterList extends IProductListSidebar {
    mobileOnly?: boolean;
}

interface ISizes {
    all: boolean;
    kids: boolean;
    womens: boolean;
    mens: boolean;
    adults: boolean;
}

const FilterList = ({
    sizes,
    orderBy, 
    setOrderBy, 
    collection,
    setCollection,
    size,
    setSize,
    showCollections = false,
    mobileOnly = false
}: IFilterList) => {
    const [ showSizes, setShowSizes ] = useState<string[]>([ 'Kids', 'Womens', 'Mens', 'Adults' ]);

    useEffect(() => {
        if (sizes && sizes.length > 0) setShowSizes(sizes);
    }, [ sizes ]);

    return (
        <nav>
            <List listStyleType="none" className={cn(styles.filterList, mobileOnly && styles.mobileOnly)}>
                {showCollections && (
                    <>
                        <List.Item
                            role="button"  
                            onClick={() => setCollection('all')} 
                            className={cn(styles.filter, collection === 'all' && styles.active)}
                        >
                            All Products
                        </List.Item>
                        <List.Item
                            role="button"  
                            onClick={() => setCollection('hats')} 
                            className={cn(styles.filter, collection === 'hats' && styles.active)}
                        >
                            Hats
                        </List.Item>
                        <List.Item
                            role="button"  
                            onClick={() => setCollection('scarves')} 
                            className={cn(styles.filter, collection === 'scarves' && styles.active)}
                        >
                            Scarves
                        </List.Item>
                        <List.Item
                            role="button"  
                            onClick={() => setCollection('head-bands')} 
                            className={cn(styles.filter, collection === 'head-bands' && styles.active)}
                        >
                            Head Bands
                        </List.Item>
                        <Divider className={styles.divider} />
                    </>
                )}
                <List.Item
                    role="button"  
                    onClick={() => setSize('all')} 
                    className={cn(styles.filter, size === 'all' && styles.active)}
                >
                    All Sizes
                </List.Item>
                {showSizes.includes('Kids') && (
                    <List.Item
                        role="button"  
                        onClick={() => setSize('kids')} 
                        className={cn(styles.filter, size === 'kids' && styles.active)}
                    >
                        Kids
                    </List.Item>
                )}
                {showSizes.includes('Womens') && (
                    <List.Item
                        role="button"  
                        onClick={() => setSize('womens')} 
                        className={cn(styles.filter, size === 'womens' && styles.active)}
                    >
                        Womens
                    </List.Item>
                )}    
                {showSizes.includes('Mens') && (
                    <List.Item
                        role="button"  
                        onClick={() => setSize('mens')} 
                        className={cn(styles.filter, size === 'mens' && styles.active)}
                    >
                        Mens
                    </List.Item>
                )}
                {(showSizes.includes('Womens') || showSizes.includes('Mens') || showSizes.includes('Adults')) && (
                    <List.Item
                        role="button"  
                        onClick={() => setSize('adults')} 
                        className={cn(styles.filter, size === 'adults' && styles.active)}
                    >
                        Adults
                    </List.Item>
                )}
                <Divider className={styles.divider} />
                <List.Item
                    role="button" 
                    onClick={() => setOrderBy('updatedAt')} 
                    className={cn(styles.filter, orderBy === 'updatedAt' && styles.active)}
                >
                    Most Recent
                </List.Item>
                <List.Item
                    role="button" 
                    onClick={() => setOrderBy('priceLowToHigh')} 
                    className={cn(styles.filter, orderBy === 'priceLowToHigh' && styles.active)}
                >
                    Price Low to High
                </List.Item>
                <List.Item
                    role="button" 
                    onClick={() => setOrderBy('priceHighToLow')} 
                    className={cn(styles.filter, orderBy === 'priceHighToLow' && styles.active)}
                >
                    Price High to Low
                </List.Item>
                <Divider className={styles.divider} />
                <Button 
                    size="md" 
                    color="green" 
                    variant="light"
                    onClick={() => {
                        setOrderBy('updatedAt');
                        setCollection('all');
                        setSize('all');
                    }}
                >
                    Reset Filters
                </Button>
            </List>
        </nav>
    );
};

export default FilterList;