export interface Product{
    id?: number;
    name: string;
    price: number;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
    imageUrl?: string;
}

export class ProductConvert {
    public static toProduct(json: string): Product {
        return JSON.parse(json);
    }

    public static ProductToJson(value: Product): string {
        return JSON.stringify(value);
    }

}
