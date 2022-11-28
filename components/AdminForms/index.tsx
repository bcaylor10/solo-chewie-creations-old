import ProductForm from "./ProductForm";
import PromoForm from "./PromoForm";

export interface IAdminForm {
    onSubmit: any;
    loading: boolean;
    title: string;
    buttonTitle?: string;
    formData?: any;
    onDelete?: any;
    deleteLoading?: boolean;
}

export { ProductForm, PromoForm };