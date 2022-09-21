import Profile from "./Profile";
import ProductReviews from "./ProductReviews";
import ShippingBilling from "./ShippingBilling";
import OrderHistory from "./OrderHistory";

export interface IAccountTab {
    panelName: string;
    user: any;
}

export { Profile, ProductReviews, ShippingBilling, OrderHistory };