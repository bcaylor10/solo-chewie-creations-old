import YourCart from "./YourCart";
import Details from "./Details";

import { ICart } from '@/redux/cart';

export interface ICheckout {
    cart: ICart;
    local: boolean;
    setLocal: (val: boolean) => void;
    totalPrice: number;
    setTotalPrice: (val: number) => void;
}

export { YourCart, Details };