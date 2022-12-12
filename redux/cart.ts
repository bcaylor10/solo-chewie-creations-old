import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, countBy, map } from 'lodash';

import { IProduct } from '@/mongo/models/Product';
import { IPromo } from '@/mongo/models/Promo';

export interface ICart {
    cartItems: ICartItem[];
    promo?: IPromo;
}
export interface ICartItem {
    product: string;
    quantity?: number;
}

const defaultCart = {
    cartItems: [],
    promo: null
}

// @ts-ignore
const initialState: ICart = typeof window !== 'undefined' ? JSON.parse(window?.localStorage.getItem('cart')) : defaultCart;

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState || defaultCart,
    reducers: { // @ts-ignore
        setCart: (slice, action) => {
            const cartItems: ICartItem[] = action.payload.cartItems;
            const promo = action.payload.promo;
            let cart: ICartItem[] = [];
            let currentCartItems: IProduct[] = [];

            if (isEmpty(cartItems)) {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem('cart', JSON.stringify(defaultCart)); 
                }
               
                return defaultCart;
            }

            cartItems.forEach((c: any) => {
                if (!c.product) currentCartItems.push(c);

                for (let i = 0; i < c.quantity; i++) {
                    currentCartItems.push(c.product);
                }
            });
            
            cart = map(countBy(currentCartItems), (key, value) => ({ product: value, quantity: key }));

            const newCart = {
                cartItems: cart,
                promo: promo
            };

            window.localStorage.setItem('cart', JSON.stringify(newCart));            
            return newCart;
        },
    }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;