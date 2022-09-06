import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, groupBy, values, find } from 'lodash';

import { IProduct } from '@/mongo/models/Product';

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

// @ts-ignore
const initialState: ICartItem[] = typeof window !== 'undefined' ? JSON.parse(window?.localStorage.getItem('cart')) : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState || [],
    reducers: { // @ts-ignore
        setCart: (slice, action) => {
            const cartItems: ICartItem[] = action.payload;
            let cart: ICartItem[] = [];
            let currentCartItems: IProduct[] = [];

            if (isEmpty(cartItems)) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('cart');
                }
               
                return [];
            }

            cartItems.forEach((c: any) => {
                if (!c.product) currentCartItems.push(c);

                for (let i = 0; i < c.quantity; i++) {
                    currentCartItems.push(c.product);
                }
            })

            cart = values(groupBy(currentCartItems, '_id')).map(c => ({ product: c[0], quantity: c.length}));

            window.localStorage.setItem('cart', JSON.stringify(cart));            
            return cart;
        },
    }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;