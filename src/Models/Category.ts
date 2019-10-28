import { number } from "prop-types"

export interface Category {
    id?: number;
    name: string;
    description: string;
}


export class CategoryConvert {

    public static toCategory(json: string): Category {
        return JSON.parse(json);
    }

    public static CategoryToJson(value: Category): string {
        return JSON.stringify(value);
    }

}