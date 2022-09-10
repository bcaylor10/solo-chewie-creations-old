import { createStyles } from "@mantine/core"; 
import { get, orderBy } from 'lodash';

import { IProduct } from '@/mongo/models/Product';
import { ICartItem } from '@/redux/cart';

import routes from "@/routes";

export interface IRating {
    count: number;
    amount: number;
}

export const PRODUCT_TYPES = {
    hat: 0,
    scarf: 1,
    headBand: 2
}

export const calculateWaitTime = (shipping = false): number => {
    const hoursPerWeek = 5;
    const backedHours = 0; // TODO: create function to query all products
	let waitTime = Math.ceil(backedHours / hoursPerWeek);
	
    if (shipping) waitTime += 1;
    
    return waitTime;
}

// run the fetch + 
export const request = (url: string, customOptions?: any) => {
    const options = {
        method: 'GET',
        ...customOptions
    };

    return fetch(url, options).then((res) => res.json());
}

export const menuStyles = createStyles(() => ({
    item: {
        color: '#1a5545',
        transition: 'all .2s ease-in-out',
        '&[data-hovered]': {
            backgroundColor: '#E7F5FF'
        },
    },
}));

export const buildProductUrl = (product?: IProduct, size?: string): string => {
    if (!product) return '';

    const productType: string = product.name.toLowerCase();
    const productSize: string = size ? size.toLowerCase() : product.size.toLowerCase();
    let route: string = '';

    switch (productType) {
        case 'hat':
            route = routes.products.hatsView(productSize);
            break;
        case 'scarf':
            route = routes.products.scarvesView(productSize);
            break;
        case 'head band':
            route = routes.products.headBandsView(productSize);
            break;
    }

    return route;
}

export const formatPrice = (price: number | undefined): string => {
    if (!price) return '';

    const usdFormat = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const formattedPrice = usdFormat.format(price);

    return formattedPrice;
}

export const formatImagesArray = (images: string[]): string[] => {
    if (images.length === 0) return [];

    const formatted: string[] = images[0].replace(/\s/g, '').split(',');
    return formatted;
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const calculateTotalPrice = (cart: ICartItem[]): string => {
    let price = 0;
    
    cart.forEach((c: ICartItem) => {
        const pricing = c.product.pricing;
        const normal = get(c.product, [ 'pricing', 'price' ]);
        const onSale = get(c.product, [ 'pricing', 'sale_price' ]);
        const itemPrice = (onSale && onSale !== 0) ? onSale : normal;
        // @ts-ignore
        const amount = itemPrice * c.quantity;

        price += amount;
    });

    return formatPrice(price);
}

export const getRatingInfo = (ratingArray: number[]): IRating => {
    return {
        count: ratingArray.reduce((a, b) => a + b) / ratingArray.length,
        amount: ratingArray.length
    }
}

export const orderProducts = (order: string, products?: IProduct[]): IProduct[] => {
    if (!products) return [];

    let ordered = products;

    switch (order) {
        case 'updatedAt':
            ordered = ordered;
            break;
        case 'priceLowToHigh':
            ordered = orderBy(products, (p) => {
                const normal = get(p, [ 'pricing', 'price' ]);
                const onSale = get(p, [ 'pricing', 'sale_price' ]);

                if (onSale && onSale !== 0) {
                    return onSale;
                } else {
                    return normal;
                }
            }, ['asc']);
            break;
        case 'priceHighToLow':
            ordered = orderBy(products, (p) => {
                const normal = get(p, [ 'pricing', 'price' ]);
                const onSale = get(p, [ 'pricing', 'sale_price' ]);

                if (onSale && onSale !== 0) {
                    return onSale;
                } else {
                    return normal;
                }
            }, ['desc']);
            break;
    }

    return ordered;
}

export const filterProductsByName = (name: string, products?: IProduct[]): IProduct[] => {
    if (!products) return [];

    let ordered = products;

    switch (name) {
        case 'all':
            ordered = ordered;
            break;
        case 'hats':
            ordered = ordered.filter((o) => o.name === 'Hat');
            break;
        case 'scarves':
            ordered = ordered.filter((o) => o.name === 'Scarf');
            break;
        case 'head-bands':
            ordered = ordered.filter((o) => o.name === 'Head Band');
            break;
    }

    return ordered;
}

export const filterProductsBySize = (size: string, products?: IProduct[]): IProduct[] => {
    if (!products) return [];

    let ordered = products;

    switch (size) {
        case 'all':
            ordered = ordered;
            break;
        case 'kids':
            ordered = ordered.filter((o) => o.size === 'Kids');
            break;
        case 'womens':
            ordered = ordered.filter((o) => o.size === 'Womens');
            break;
        case 'mens':
            ordered = ordered.filter((o) => o.size === 'Mens');
            break;
        case 'adults':
            ordered = ordered.filter((o) => o.size !== 'Kids');
            break;
    }

    return ordered;
}