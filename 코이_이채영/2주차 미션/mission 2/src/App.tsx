import React, { useState, createContext, useContext } from "react";
import "./index.css";

interface Todo {
  id: number;
  text: string;
}

interface TodoContextType {
  todos: Todo[];
  doneTasks: Todo[];
  inputText: string;
  setInputText: (text: string) => void;
  addTodo: (text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
    setInputText("");
  };

  const completeTodo = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTasks([...doneTasks, todo]);
  };

  const deleteTodo = (todo: Todo) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTasks, inputText, setInputText, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

const TodoForm: React.FC = () => {
  const { inputText, setInputText, addTodo } = useTodo();
  return (
    <form
      className="todo-container__form"
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(inputText);
      }}
    >
      <input
        type="text"
        className="todo-container__input"
        id="todo-input"
        placeholder="할 일을 입력해주세요"
        value={inputText}
        required
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" className="todo-container__add-button" id="todo-add">
        할 일 추가
      </button>
    </form>
  );
};

const TodoList: React.FC = () => {
  const { todos, completeTodo } = useTodo();
  return (
    <div className="todo-main__task">
      <h3>할 일</h3>
      <ul className="todo-main__list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-main__item">
            <p className="todo-main__item-text">{todo.text}</p>
            <button className="todo-main__item-button" onClick={() => completeTodo(todo)}>
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DoneList: React.FC = () => {
  const { doneTasks, deleteTodo } = useTodo();
  return (
    <div className="todo-main__task">
      <h3>완료</h3>
      <ul className="todo-main__list">
        {doneTasks.map((todo) => (
          <li key={todo.id} className="todo-main__item">
            <p className="todo-main__item-text">{todo.text}</p>
            <button className="todo-main__item-button" onClick={() => deleteTodo(todo)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__title">YONG TODO</h1>
        <TodoForm />
        <div className="todo-main">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
