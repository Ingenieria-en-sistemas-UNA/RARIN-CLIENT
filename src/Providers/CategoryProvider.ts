import { Category, CategoryConvert } from '../Models/Category';
import { async } from 'q';
import { BaseProvider } from './BaseProvider';
import { any, number } from 'prop-types';
import { recomposeColor } from '@material-ui/core/styles';

export class CategoryProvider extends BaseProvider {


    get = async () => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/categories`)
            if (response.status >= 200 && response.status < 300) {
                const categories = await response.json();
                console.log({ categories })
            }
        } catch (error) {

        }
    }
    delete = async (id: number) => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/categories/${id}`, {
                method: 'DELETE',
            });
            if (response.status >= 200 && response.status < 300) {
                const categories = await response.json();
                console.log({ categories })
            }
        } catch (error) {

        }
    }
    update = async (Category: Category) => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/categories/${Category}`, {
                method: 'PUT',
            });
            if (response.status >= 200 && response.status < 300) {
                const categories = await response.json();
                console.log({ categories })
            }
        } catch (error) {
        }
    }
    create = async (Category: Category) => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/categories/${Category}`, {
                method: 'POST',
            });
            if (response.status >= 200 && response.status < 300) {
                const categories = await response.json();
                console.log({ categories })
                }
        } catch (error) {
        }
    }
}