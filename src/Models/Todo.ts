export interface Todo {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
}

// Converts JSON strings to/from your types
export class TodoConvert {
    public static toTodo(json: string): Todo {
        return JSON.parse(json);
    }

    public static toTodos(json: Todo[]): Todo[] {
        let todos : Todo[] = [];
        json.forEach((todo: Todo) => {
            console.log(todo);
            todos.push(todo)
        })
        return todos
    }

    public static todoToJson(value: Todo): string {
        return JSON.stringify(value);
    }


}
