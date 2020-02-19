import { Product } from './Product';
import { ItemCar } from './ItemCar';
export interface ShoppingCar{
    items: ItemCar[]
}

export class ShoppingCarConvert {
    public static toShoppingCar(json: string): ShoppingCar {
        return JSON.parse(json);
    }

    public static ShoppingCarToJson(value: ShoppingCar): string {
        return JSON.stringify(value);
    }

}
