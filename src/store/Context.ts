import { TodoBloc } from './TodoBloc';
import { createContext } from 'react';


class Blocs {

    public todoBloc: TodoBloc = new TodoBloc();
    
}

const blocs: Blocs = new Blocs();

Object.freeze(blocs);

export const BlocsContext = createContext(blocs);

export const { Provider, Consumer } = BlocsContext;
