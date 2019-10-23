import { Person } from './Person';
import { ShoppingCar } from './ShoppingCar';
import { Voucher } from './Voucher';
export interface Client{
    id?: number;
    person: Person;
    shoppingCard?: ShoppingCar;
    vouchers?: Voucher[]
}

export class ClientConvert {
    public static toClient(json: string): Client {
        return JSON.parse(json);
    }

    public static ClientToJson(value: Client): string {
        return JSON.stringify(value);
    }

}
