import React, { FC, createContext, useContext, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { TodoBloc } from './store/TodoBloc';



const todoBloc: TodoBloc = new TodoBloc();
export const TodoContext = createContext(todoBloc);


const App: FC = () => {

  const context = useContext(TodoContext);
  useEffect(() => {
    return context.dispose;
  }, [context]);
  
  return (
    <TodoContext.Provider value={ context }>
      <div className="App"> 
        <HomePage title= "Titulo" />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
