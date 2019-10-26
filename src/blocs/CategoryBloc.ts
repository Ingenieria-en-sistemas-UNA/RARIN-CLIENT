import { BehaviorSubject } from 'rxjs';
import { Error } from '../Models/Errors';
import { CategoryProvider } from '../Providers/CategoryProvider';
import { Category } from '../Models/Category';
import { ResponseCategory } from '../Models/Responses';

export class CategoryBloc {

    private provider: CategoryProvider = new CategoryProvider()
    private loadingController = new BehaviorSubject<boolean>(false);
    private errorsController = new BehaviorSubject<Error[]>([]);
    private categoriesController = new BehaviorSubject<Category[]>([]);

    public loadingStrem = () => this.loadingController.asObservable()
    public errorsStrem = () => this.errorsController.asObservable()
    public categoriesStrem = () => this.categoriesController.asObservable()

    public add = async(category: Category): Promise<boolean> => {
        this.loadingController.next(true);
        const response: ResponseCategory = await this.provider.create(category);
        let created: boolean = false;
        let errors: Error[] = [];
        if(response.ok){
            if (response.category) {
                const categories = this.categoriesController.value;
                categories.push(response.category);
                this.categoriesController.next(categories);
                created = true;
            } else {
                errors = [{ message: 'Algo ha ocurrido con la categoria'}];
            }
        } else {
            if(response.errors){
                errors = response.errors.map((message: string): Error => ({ message }));
            } else {
                errors = [{ message: 'Algo ha ocurrido'}];
            }
        }
        if(errors.length > 0){
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
        this.categoriesController.complete();
    }

}