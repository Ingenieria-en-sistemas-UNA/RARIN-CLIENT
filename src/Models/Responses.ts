import { User } from './User';
export interface ResponseUser {
    ok: boolean,
    errors?: Array<string>,
    user?: User
}