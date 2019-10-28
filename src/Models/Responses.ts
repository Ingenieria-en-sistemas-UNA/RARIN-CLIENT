import { User } from './User';
import { Category } from './Category';
import { Product } from './Product';
export interface ResponseUser {
    ok: boolean,
    errors?: Array<string>,
    user?: User
}
export interface ResponseCategory {
    ok: boolean;
    errors?: Array<string>;
    category?: Category;
    categories?: Category[];
}

export interface ResponseProduct {
    ok: boolean;
    errors?: Array<string>;
    product?: Product;
    products?: Product[];
}