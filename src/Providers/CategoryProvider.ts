import { Category } from "../Models/Category";
import { BaseProvider } from "./BaseProvider";
import { ResponseCategory } from "../Models/Responses";
import { AuthProvider } from './AuthProvider';

export class CategoryProvider extends BaseProvider {

  private provider: AuthProvider = new AuthProvider()

  get = async (): Promise<ResponseCategory> => {
    try {
      const response: Response = await fetch(`${this._baseUrlApi}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${this.provider.getToken()}`
        }
      });
      if (response.status >= 200 && response.status < 300) {
        const categories = await response.json();
        return { ok: true, categories };
      }
      throw Error('Algo ha ocurrido')
    } catch (error) {
      return { ok: false, errors: [error.message] }
    }
  }


  delete = async (id: number) => {
    try {
      const response: Response = await fetch(
        `${this._baseUrlApi}/api/categories/${id}`,
        {
          method: "DELETE"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const categories = await response.json();
        console.log({ categories });
      }
    } catch (error) { }
  }


  update = async (Category: Category) => {
    try {
      const response: Response = await fetch(
        `${this._baseUrlApi}/api/categories/${Category}`,
        {
          method: "PUT"
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const categories = await response.json();
        console.log({ categories });
      }
    } catch (error) { }
  };

  create = async (category: Category): Promise<ResponseCategory> => {
    try {
      const response: Response = await fetch(
        `${this._baseUrlApi}/api/categories`,
        {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            'Authorization': `Bearer ${this.provider.getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        const categoryResponse = await response.json();
        return { ok: true, category: categoryResponse };
      }
      throw Error('Algo ha ocurrido')
    } catch (error) {
      return { ok: false, errors: [error.message] }
    }
  }


}
