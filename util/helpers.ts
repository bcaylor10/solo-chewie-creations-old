import { createStyles } from "@mantine/core"; 
import { get, orderBy } from 'lodash';
// @ts-ignore
import { verify } from 'jsonwebtoken';
import axios from 'axios';

import { IProduct } from '@/mongo/models/Product';
import { ICart, ICartItem } from '@/redux/cart';
import { PROMO_TYPES } from "@/mongo/models/Promo";
import routes from "@/routes";
import { IPromo } from '../mongo/models/Promo';

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

export const promoIsValid = (promo: IPromo): boolean => {
    const currentDate = new Date();
    const startDate = new Date(promo.start_date)
    const expirationDate = promo?.expiration_date ? new Date(promo.expiration_date) : null;

    if (startDate < currentDate ) {
        if (!expirationDate || (expirationDate && expirationDate > currentDate)) {
            return true;
        }
    }

    return false;
};

export const calculatePromoCost = (product: IProduct, quantity: number, promo: IPromo, formatted = false): string | number => {
    let price = product.price * quantity;

    if (promoIsValid(promo)) {
        if (product.promos && product.promos.length > 0) {
            if (product.promos.includes(promo.code)) {
                if (promo.type === 0) {
                    // fixed amount off
                    const newPrice = product.price - promo.discount_amount;
                    price = newPrice * quantity;
                } else {
                    // percentage off
                    const newPrice = (promo.discount_amount / 100) * product.price;
                    price = newPrice * quantity;
                }
            }
        }
    }
    
    return formatted ? formatPrice(price) : price;
};

export const calculateTotalPrice = (cart: ICart, includeShipping = false, original = false): string => {
    let price = 0;
    if (!cart.cartItems) return formatPrice(price);
    const { promo } = cart;

    /*
        1, check if promo is listed on item
        2. check if promo has started
        3. check if promo has ended
    */

    cart.cartItems.forEach((c: ICartItem) => {
        const product = c.product;
        let amount = product.price * c.quantity;

        if (promo && !original) {
            // @ts-ignore
            amount = calculatePromoCost(product, c.quantity, promo);
        }
        
        price += amount;
    });

    if (includeShipping) price += 7.99;

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
            ordered = orderBy(products, (p) => p.price, ['asc']);
            break;
        case 'priceHighToLow':
            ordered = orderBy(products, (p) => p.price, ['desc']);
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

export const verifyUserToken = async (userId: string, token: string) => {
    try {
        const { data } = await axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
        const header64 = token.split('.')[0];
        const header = JSON.parse(Buffer.from(header64, 'base64').toString('ascii'));
        const decoded = verify(token, data[header.kid]);

        return decoded && decoded.user_id === userId;
    } catch (err) {
        console.log('Error verifying token: ', err);
    }

    return null;
}