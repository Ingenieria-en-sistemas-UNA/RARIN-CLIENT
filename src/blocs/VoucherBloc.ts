import { BehaviorSubject } from 'rxjs';
import { Error } from '../Models/Errors';
import { ResponseCategory, ResponseVoucher } from '../Models/Responses';
import { VoucherProvider } from '../Providers/VoucherProvider';
import { Voucher } from '../Models/Voucher';

export class VoucherBloc {

    private provider: VoucherProvider = new VoucherProvider()
    private loadingController = new BehaviorSubject<boolean>(false);
    private errorsController = new BehaviorSubject<Error[]>([]);
    private voucherController = new BehaviorSubject<Voucher[]>([]);

    public loadingStrem = () => this.loadingController.asObservable()
    public errorsStrem = () => this.errorsController.asObservable()
    public vouchersStream = () => this.voucherController.asObservable()

    public load = async () => {
        this.loadingController.next(true);
        const response: ResponseVoucher = await this.provider.get();
        let errors: Error[] = [];
        if (response.ok) {
            if (response.vouchers) {
                this.voucherController.next(response.vouchers);
            } else {
                errors = [{ message: 'Algo ha ocurrido con los vouchers' }];
            }
        } else {
            if (response.errors) {
                errors = response.errors.map((message: string): Error => ({ message }));
            } else {
                errors = [{ message: 'Algo ha ocurrido' }];
            }
        }
        if (errors.length > 0) {
            this.errorsController.next(errors);
        }
        this.loadingController.next(false)
    }

    public add = async (voucher: Voucher): Promise<boolean> => {
        this.loadingController.next(true);
        const response: ResponseVoucher = await this.provider.create(voucher);
        let created: boolean = false;
        let errors: Error[] = [];
        if (response.ok) {
            if (response.voucher) {
                const vouchers = this.voucherController.value;
                vouchers.push(response.voucher);
                this.voucherController.next(vouchers);
                created = true;
            } else {
                errors = [{ message: 'Algo ha ocurrido con el voucher' }];
            }
        } else {
            if (response.errors) {
                errors = response.errors.map((message: string): Error => ({ message }));
            } else {
                errors = [{ message: 'Algo ha ocurrido' }];
            }
        }
        if (errors.length > 0) {
            this.errorsController.next(errors);
        }
        this.loadingController.next(false)
        return created
    }

    public cleanErrors = () => {
        this.errorsController.next([]);
    }


    public dispose = () => {
        this.loadingController.complete();
        this.errorsController.complete();
        this.voucherController.complete();
    }

}