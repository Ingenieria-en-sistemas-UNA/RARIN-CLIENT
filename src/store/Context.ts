import { TodoBloc } from './TodoBloc';
import { createContext } from 'react';
import { AuthBloc } from '../blocs/AuthBloc';
import { CategoryBloc } from '../blocs/CategoryBloc';
import { ProductBloc } from '../blocs/ProductBloc';
import { ShoppingCarBloc } from '../blocs/ShoppingCarBloc';


export class Blocs {

    public todoBloc: TodoBloc = new TodoBloc();
    public authBloc: AuthBloc = new AuthBloc();
    public categoryBloc: CategoryBloc = new CategoryBloc();
    public productBloc: ProductBloc = new ProductBloc();
    public shoppingCarBloc: ShoppingCarBloc = new ShoppingCarBloc();

}

const blocs: Blocs = new Blocs();

Object.freeze(blocs);

export const BlocsContext = createContext(blocs);

export const { Provider, Consumer } = BlocsContext;
