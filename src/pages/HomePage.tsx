import React, { Component, useContext } from 'react'
import { Todo } from '../Models/Todo';
import { StreamBuilder, Snapshot, ConnectionState } from 'react-stream-builder'
import { TodoContext } from '../App';


interface FromProps {
    title: string,

}

interface FromState {
}

const HomePage = ({ title }: FromProps) => {

    const context = useContext(TodoContext);
    context.loadTodos();
    return (
        <div>
            <h1>{title}</h1>
            <button onClick = {() => context.addTodo() } >Nuevo</button>
            <StreamBuilder
                stream={context.todoStrem()}
                builder={(snapshot: Snapshot<Todo[]>) => {
                    // If the observable has not yet emitted any values print a message
                    // indicating that we're still waiting.
                    if (snapshot.state !== ConnectionState.active) {
                        return "Loading...";
                    }
                    return snapshot.data.map((todo, i) => <li key={i} >{todo.title}</li>)
                }}

            />
        </div>
    );

}

export default HomePage;