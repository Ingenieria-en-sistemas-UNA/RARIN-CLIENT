import { Person } from './Person';
import { Voucher } from './Voucher';
export interface Client{
    id?: number;
    person: Person;
    vouchers?: Voucher[]
}

export class ClientConvert {
    public static toClient(json: string): Client {
        return JSON.parse(json);
    }

    public static ClientToJson(value: Client): number {
        return value.id as number;
    }

}
