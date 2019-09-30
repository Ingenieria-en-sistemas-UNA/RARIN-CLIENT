import React, { useContext } from 'react' 
import { Todo } from '../Models/Todo';
import { BlocsContext } from '../store/Context';
import { StreamBuilder, Snapshot } from '../utils/BlocBuilder';

interface FromProps {
    title: string,

}

const HomePage = ({ title }: FromProps) => {

    const { todoBloc } = useContext(BlocsContext);
    todoBloc.loadTodos()
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => todoBloc.addTodo()} >Nuevo</button>
            <StreamBuilder
                stream = { todoBloc.todoStrem() }
                builder = {(snapshot: Snapshot<Todo[]>)=> {
                    if(snapshot.hasError){
                        alert(snapshot.error);
                    }
                    if(snapshot.hasData){
                        let todos: Todo[] = snapshot.data || [];
                        return todos.map((todo, i) => <li key={i} >{todo.title}</li>)
                    }
                    return "Loading...";
                }}
            /> 
        </div>
    );

}

export default HomePage;