import { FormEvent, useState } from "react";
import { useTodo } from '../context/TodoContext';

// 할 일 추가 입력폼
const TodoForm = () => {
    const[input, setInput] = useState<string>('');
    const{addTodo} = useTodo();

    // 폼 제출 시 실행되는 함수수
    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const text = input.trim(); // 앞뒤 공백 제거거

        if (text) {
            addTodo(text);
            setInput('');
        }
    };

    return (
        <form onSubmit = {handleSubmit} className="todo-container__form">
            <input
            value = {input}
            onChange={(e) : void => setInput(e.target.value)}
            type="text"
            className="todo-container__input"
            placeholder="할 일 입력"
            required
            />
            <button type="submit" className="todo-container__button">
                할 일 추가
            </button>
        </form>
    )
};

export default TodoForm;