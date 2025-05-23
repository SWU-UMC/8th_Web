import { TTodo } from "../types/Todo";
import { createContext, PropsWithChildren, useContext, useState } from 'react';


interface ITodoContext{
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string)=> void;
    completeTodo: (todo: TTodo)=> void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext= createContext<ITodoContext | undefined> 
(undefined);
//Provider를 씌우지 않는 곳은 undefined라고 명시

export const TodoProvider=({children}: 
PropsWithChildren): React.ReactElement => {
    
    const [todos, setTodos]= useState <TTodo[]>([]);
    const [doneTodos, setDoneTodos]=useState <TTodo[]>([]);

    const addTodo=(text: string) : void => {
        const newTodo: TTodo={id: Date.now(), text};
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    };
    const completeTodo=(todo: TTodo) : void => {
        setTodos(prevTodos => prevTodos.filter((t): boolean => t.id 
        !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[]=> [...prevDoneTodos, todo]);
        
    };
        
    const deleteTodo=(todo: TTodo): void=>{
    setDoneTodos((prevDoneTodo): TTodo[]=> prevDoneTodo.filter((t): boolean => t.id !== todo.id)
        );
    };

    return (
    <TodoContext.Provider value={{todos, doneTodos, 
        addTodo, deleteTodo, completeTodo}}>
            {children}
            
        </TodoContext.Provider>
    );
};

export const useTodo=() : ITodoContext => {
    const context=useContext(TodoContext);
    //context가 없는 경우
    if (!context) {
        throw new Error(
            'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
        );
    };
    //context가 있는 경우우
    return context;

};
    