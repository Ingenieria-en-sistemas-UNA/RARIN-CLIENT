import { Client } from './Client';
import { Product } from './Product';
export interface Voucher{
    id : number;
    client : Client;
    products : Product[];
    detail : string;
}

export class VoucherConvert {
    public static toVoucher(json: string): Voucher {
        return JSON.parse(json);
    }

    public static VoucherToJson(value: Voucher): string {
        return JSON.stringify(value);
    }

}
