import { IUser } from "@/layouts/BaseLayout/Header/Navigation/UserMenu/AvatarButton";
import Profile from "./Profile";
import ProductReviews from "./ProductReviews";
import ShippingBilling from "./ShippingBilling";
import OrderHistory from "./OrderHistory";

export interface IAccountTab {
    panelName: string;
    user: IUser;
}

export { Profile, ProductReviews, ShippingBilling, OrderHistory };