import { User } from './User';
import { Category } from './Category';
export interface ResponseUser {
    ok: boolean,
    errors?: Array<string>,
    user?: User
}
export interface ResponseCategory {
    ok: boolean;
    errors?: Array<string>;
    category?: Category;
}