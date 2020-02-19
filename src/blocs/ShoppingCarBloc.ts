import { BehaviorSubject } from 'rxjs';
import { Error } from '../Models/Errors';
import { ShoppingCar } from '../Models/ShoppingCar';
import { ItemCar } from '../Models/ItemCar';
import { Product } from '../Models/Product';

export class ShoppingCarBloc {

    private loadingController = new BehaviorSubject<boolean>(false);
    private errorsController = new BehaviorSubject<Error[]>([]);
    private shoppingCarController = new BehaviorSubject<ShoppingCar>({ items: [] });

    public loadingStream = () => this.loadingController.asObservable()
    public errorsStream = () => this.errorsController.asObservable()
    public shoppingCartStream = () => this.shoppingCarController.asObservable()

    public getItems = () => this.shoppingCarController.value.items;

    public addItem = (product: Product) => {
        const shoppingCar = this.shoppingCarController.value;
        let index = this.searchProduct(product);

        if (index !== -1) {
            const item = shoppingCar.items[index];
            item.cant++;
            const items = shoppingCar.items.filter((itemList) => itemList.id !== item.id);
            shoppingCar.items = [item, ...items];
        } else {
            const itemCar: ItemCar = { cant: 1, product, id: shoppingCar.items.length + 1 }
            shoppingCar.items = [itemCar, ...shoppingCar.items];
        }
        this.shoppingCarController.next(shoppingCar);
    }

    public removeItem = (product: Product) => {
        const shoppingCar = this.shoppingCarController.value;
        let index = this.searchProduct(product);
        if (index !== -1) {
            const item = shoppingCar.items[index];
            item.cant--;
            if (item.cant === 0) {
                const items = shoppingCar.items.filter((itemList) => itemList.id !== item.id);
                shoppingCar.items = [...items];
            } else {
                const items = shoppingCar.items.filter((itemList) => itemList.id !== item.id);
                shoppingCar.items = [item, ...items];
            }
            this.shoppingCarController.next(shoppingCar);
        }
    }

    public searchProduct = (product: Product): number => {
        let indexItem = -1;
        const shoppingCar = this.shoppingCarController.value;
        shoppingCar.items.forEach((item, index) => {
            if (item.product.id === product.id) {
                indexItem = index;
            }
        });
        return indexItem;
    }

    public cleanErrors = () => {
        this.errorsController.next([]);
    }


    public dispose = () => {
        this.loadingController.complete();
        this.errorsController.complete();
        this.shoppingCarController.complete();
    }

}