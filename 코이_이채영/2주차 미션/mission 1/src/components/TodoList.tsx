import { JSX } from "react";
import { TTodo } from "../type/todo";

interface TodoListProps {
  title: string;
  todos?: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonColor,
  buttonLabel,
  onClick,
}: TodoListProps): JSX.Element => {
  return (
    <div className="todo-main__task">
      <h3>{title}</h3>
      <ul id="todo-list" className="todo-main__list">
        {todos?.map(
          (todo): JSX.Element => (
            <li key={todo.id} className="todo-main__item">
              <span className="todo-main__item-text">{todo.text}</span>
              <button
                onClick={(): void => onClick(todo)}
                style={{
                  backgroundColor: buttonColor,
                }}
                className="todo-main__item-button"
              >
                {buttonLabel}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;