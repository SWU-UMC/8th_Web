import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { JSX } from "react";

const Todo = (): JSX.Element => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
  
  return (
    <div className="todo-container">
      <h1 className="todo-contatiner__header">KOI's TODO</h1>
      <TodoForm />
      <div className="todo-main">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;