import { BaseProvider } from './BaseProvider';
import { AuthProvider } from './AuthProvider';
import { ResponseVoucher } from '../Models/Responses';
import { Voucher } from '../Models/Voucher';




export class VoucherProvider extends BaseProvider {

    private provider: AuthProvider = new AuthProvider()

    get = async (): Promise<ResponseVoucher> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/vouchers`, {
                headers: {
                    'Authorization': `Bearer ${this.provider.getToken()}`
                }
            });
            if (response.status >= 200 && response.status < 300) {
                const vouchers = await response.json();
                return { ok: true, vouchers };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }

    create = async (voucher: Voucher): Promise<ResponseVoucher> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/products`,
                {
                    method: 'POST',
                    body: JSON.stringify(voucher),
                    headers: {
                        'Authorization': `Bearer ${this.provider.getToken()}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status >= 200 && response.status < 300) {
                const voucherResponse = await response.json();
                return { ok: true, voucher: voucherResponse };
            }
            throw Error('Algo ha ocurrido')
        } catch (error) {
            return { ok: false, errors: [error.message] }
        }
    }
}