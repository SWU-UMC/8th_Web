import React, { FormEvent, useState } from 'react'
import { useTodo } from '../context/TodoContext';

const TodoForm = (): React.ReactElement => {
    const [input, setInput]=useState<string>('');
    const {addTodo}=useTodo();
    

    const handleSubmit=(e: FormEvent<HTMLFormElement>): void =>{
    e.preventDefault(); //새로고침 방지
    console.log('Input', input);
    const text=input.trim();

    if(text){ //text가 있을 경우
        //addTodo
        addTodo(text);
        setInput('');
        };
    };

 return (
    <form onSubmit={handleSubmit} 
    className='todo-container__form'>
        <input
          value={input}
          onChange={(e): void => setInput(e.target.value)}
          type='text' className='todo-container__input' 
          placeholder="할 일을 입력해주세요."
          required/>
        <button type='submit' className='todo-container__button'>
          할 일 추가
        </button>
      </form>
  );
};

export default TodoForm;
