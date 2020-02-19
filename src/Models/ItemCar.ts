import { Product } from './Product';

export interface ItemCar {
    id: number;
    product: Product;
    cant: number;
}

export class ItemCarConvert {
    public static toItemCar(json: string): ItemCar {
        return JSON.parse(json);
    }

    public static ItemCarToJson(values: ItemCar[]): any {
        return values.map(({ cant, product:{ id } }) => ({ cant, productId: id as number }))
    }

}