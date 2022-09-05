import { createStyles } from "@mantine/core"; 

import { IProduct } from '../mongo/models/Product';
import routes from "@/routes";

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

export const buildProductUrl = (product: IProduct, size?: string): string => {
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
    const formatted: string[] = images[0].replace(/\s/g, '').split(',');
    return formatted;
};