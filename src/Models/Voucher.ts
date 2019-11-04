import { Client } from './Client';
import { ItemCar } from './ItemCar';

export interface Voucher {
    id?: number;
    clientId: number;
    client: Client;
    items: ItemCar[];
    detail: string;
    createdAt?: Date;
}

export class VoucherConvert {
    public static toVoucher(json: string): Voucher {
        return JSON.parse(json);
    }

    public static VoucherToJson(value: Voucher): string {
        return JSON.stringify(value);
    }

}
