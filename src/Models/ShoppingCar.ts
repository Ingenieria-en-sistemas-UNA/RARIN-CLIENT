import { Product } from './Product';
export interface ShoppingCar{
    id: number;
    products: Product[]
}

export class ShoppingCarConvert {
    public static toShoppingCar(json: string): ShoppingCar {
        return JSON.parse(json);
    }

    public static ShoppingCarToJson(value: ShoppingCar): string {
        return JSON.stringify(value);
    }

}
