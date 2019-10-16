import { TodoBloc } from './TodoBloc';
import { createContext } from 'react';
import { AuthBloc } from '../blocs/AuthBloc';


export class Blocs {

    public todoBloc: TodoBloc = new TodoBloc();
    public authBloc: AuthBloc = new AuthBloc();
    
}

const blocs: Blocs = new Blocs();

Object.freeze(blocs);

export const BlocsContext = createContext(blocs);

export const { Provider, Consumer } = BlocsContext;
