import { BaseProvider } from './BaseProvider';
import { Product } from '../Models/Product';
import { ResponseProduct } from '../Models/Responses';
import { AuthProvider } from './AuthProvider';


export class ProductsProvider extends BaseProvider {

    private provider: AuthProvider = new AuthProvider()

    get = async (): Promise<ResponseProduct> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`, {
                headers: {
                    'Authorization': `Bearer ${this.provider.getToken()}`
                }
            });
            if (response.status >= 200 && response.status < 300) {
                const products = await response.json();
                return { ok: true, products };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }

    delete = async (id: number): Promise<ResponseProduct> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.provider.getToken()}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            );
            if (response.status >= 200 && response.status < 300) {
                const productResponse = await response.json();
                return { ok: true, product: productResponse };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }

    update = async (product: Product): Promise<ResponseProduct> => {
        console.log({ product });
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products/${product.id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: {
                    'Authorization': `Bearer ${this.provider.getToken()}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            );
            if (response.status >= 200 && response.status < 300) {
                //await response.json();
                return { ok: true, product };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }

    create = async (product: Product): Promise<ResponseProduct> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`,
                {
                    method: "POST",
                    body: JSON.stringify(product),
                    headers: {
                        'Authorization': `Bearer ${this.provider.getToken()}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status >= 200 && response.status < 300) {
                const productResponse = await response.json();
                return { ok: true, product: productResponse };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }
}
