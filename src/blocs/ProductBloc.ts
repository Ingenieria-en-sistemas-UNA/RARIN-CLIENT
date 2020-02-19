import { BehaviorSubject, Subject } from 'rxjs';
import { Error } from '../Models/Errors';
import { ResponseProduct } from '../Models/Responses';
import { ProductsProvider } from '../Providers/ProductsProvider';
import { Product } from '../Models/Product';
import { FileProvider } from '../Providers/FileProvider';

export class ProductBloc {

    constructor() {
        this.products = [];
        this.productStrem().subscribe((products) => this.products = products)
    }

    private productProvider: ProductsProvider = new ProductsProvider();
    private fileProvider: FileProvider = new FileProvider();
    private loadingController = new BehaviorSubject<boolean>(false);
    private errorsController = new BehaviorSubject<Error[]>([]);
    private productsController = new Subject<Product[]>();

    public products: Product[];

    public loadingStrem = () => this.loadingController.asObservable()
    public errorsStrem = () => this.errorsController.asObservable()
    public productStrem = () => this.productsController.asObservable()

    public load = async () => {
        this.loadingController.next(true);
        const response: ResponseProduct = await this.productProvider.get();
        let errors: Error[] = [];
        if (response.ok) {
            if (response.products) {
                this.productsController.next(response.products);
            } else {
                errors = [{ message: 'Algo ha ocurrido con el producto' }];
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

    public loadByCategory = async (id: number) => {
        this.loadingController.next(true);
        const response: ResponseProduct = await this.productProvider.getByCategory(id);
        let errors: Error[] = [];
        if (response.ok) {
            if (response.products) {
                this.productsController.next(response.products);
            } else {
                errors = [{ message: 'Algo ha ocurrido con el producto' }];
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
    public loadByText = async (text: string) => {
        this.loadingController.next(true);
        const response: ResponseProduct = await this.productProvider.getByText(text);
        let errors: Error[] = [];
        if (response.ok) {
            if (response.products) {
                this.productsController.next(response.products);
            } else {
                errors = [{ message: 'Algo ha ocurrido con el producto' }];
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

    public add = async (product: Product, file: File): Promise<boolean> => {
        this.loadingController.next(true);
        let created: boolean = false;
        let errors: Error[] = [];

        const imageUrl: string | null = await this.fileProvider.upload(file);

        if (imageUrl) {
            product.imageUrl = imageUrl;
            const response: ResponseProduct = await this.productProvider.create(product);
            if (response.ok) {
                if (response.product) {
                    const products = this.products;
                    products.push(response.product);
                    this.productsController.next(products);
                    created = true;
                } else {
                    errors = [{ message: 'Algo ha ocurrido con el producto' }];
                }
            } else {
                if (response.errors) {
                    errors = response.errors.map((message: string): Error => ({ message }));
                } else {
                    errors = [{ message: 'Algo ha ocurrido' }];
                }
            }
        } else {
            errors = [{ message: 'Error al intentar subir la imagen' }];
        }
        if (errors.length > 0) {
            this.errorsController.next(errors);
        }
        this.loadingController.next(false)
        return created
    }

    public remove = async (id: number): Promise<boolean> => {
        this.loadingController.next(true);
        let created: boolean = false;
        let errors: Error[] = [];
        const response: ResponseProduct = await this.productProvider.delete(id);
        if (response.ok) {
            if (response.product) {
                const product = response.product as Product;
                const products = this.products.filter((value) => value.id !== product.id);
                this.productsController.next(products);
                created = true;
            } else {
                errors = [{ message: 'Algo ha ocurrido con el producto' }];
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

    public edit = async (product: Product, file?: File): Promise<boolean> => {
        this.loadingController.next(true);
        let created: boolean = false;
        let errors: Error[] = [];
        let imageUrl = product.imageUrl;
        if (file) {
            imageUrl = await this.fileProvider.upload(file);
        }

        if (imageUrl !== '' || !file) {
            product.imageUrl = imageUrl;
            const response: ResponseProduct = await this.productProvider.update(product);
            if (response.ok) {
                if (response.product) {
                    const product = response.product as Product;
                    const products = this.products.filter((value) => value.id !== product.id);
                    this.productsController.next([product, ...products]);
                    created = true;
                } else {
                    errors = [{ message: 'Algo ha ocurrido con el producto' }];
                }
            } else {
                if (response.errors) {
                    errors = response.errors.map((message: string): Error => ({ message }));
                } else {
                    errors = [{ message: 'Algo ha ocurrido' }];
                }
            }
        } else {
            errors = [{ message: 'Error al intentar subir la imagen' }];
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
        this.productsController.complete();
    }

}