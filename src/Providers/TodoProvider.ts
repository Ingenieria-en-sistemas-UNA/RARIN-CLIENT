import { Todo, TodoConvert } from '../Models/Todo';


export class TodoProvider {

    private _baseUrl:  string  = "https://jsonplaceholder.typicode.com"

    getTodos = async (): Promise<Todo[]> => {
        const response = await fetch(`${this._baseUrl}/todos`);
        const json = await response.json();
        console.log(json);
        return TodoConvert.toTodos( json );
    }
}