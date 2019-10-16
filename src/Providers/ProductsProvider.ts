import { BaseProvider } from './BaseProvider';
import { Product } from '../Models/Product';


export class ProducsProvider extends BaseProvider {

    get = async () => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`)
            if (response.status >= 200 && response.status < 300) {
                const products = await response.json();
                console.log({ products })
            }
        } catch (error) {

        }
    }

    delete = async (id: number) => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products/${id}`, {
                method: 'DELETE',
            });
            if (response.status >= 200 && response.status < 300) {
                const products = await response.json();
                console.log({ products })
            }
        }
        catch (error) {

        }
    }

    update = async (product: Product) => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`, {
                method: 'PUT',
                body: JSON.stringify(product)
            });
            if (response.status >= 200 && response.status < 300) {
                const products = await response.json();
                console.log({ products })
            }

        } catch (error) {

        }
    }
    
    create = async(product: Product) =>{
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`, {
                method: 'POST',
                body: JSON.stringify(product)
            });
            if (response.status >= 200 && response.status < 300) {
                const products = await response.json();
                console.log({ products })
            }
        } catch (error) {
            
        }
    }
}
