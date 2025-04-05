import { FormEvent, JSX, useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      addTodo(text);
      setInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="todo-container__form" >
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        id="todo-input"
        placeholder="할 일을 입력하세요"
        required
      />
      <button type="submit" className="todo-container__button" id="todo-add">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;