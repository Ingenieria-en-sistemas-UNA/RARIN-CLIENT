import { TodoProvider } from '../Providers/TodoProvider';
import { Todo } from '../Models/Todo';
import { BehaviorSubject } from 'rxjs';

export class TodoBloc {

    private provider: TodoProvider = new TodoProvider()
    private todosStreamController = new BehaviorSubject<Todo[]>([]);

    public todoStrem  = () => this.todosStreamController.asObservable()

    public loadTodos = async (): Promise<void> => {
        const todos = await this.provider.getTodos();
        this.todosStreamController.next(todos);
    }

    public addTodo = () => {
        const todos = this.todosStreamController.getValue();
        const todo: Todo = {
            completed: false,
            id:200,
            title: "Nuevo",
            userId: 2
        }
        todos.push(todo);    
    }
    
    public dispose = () => this.todosStreamController.complete();

}