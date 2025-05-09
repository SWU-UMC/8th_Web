import { FormEvent, useState } from 'react';
import { TTodo } from '../types/Todo';

const TodoBefore =(): React.ReactElement => {
  const [todos, setTodos]= useState <TTodo[]>([]);
  const [doneTodos, setDoneTodos]=useState <TTodo[]>([]);
  const [input, setInput]=useState<string>('');

  const handleSubmit=(e: FormEvent<HTMLFormElement>): void =>{
    e.preventDefault(); //새로고침 방지
    console.log('Input', input);
    const text=input.trim();

    if(text){ //text가 있을 경우
      const newTodo: TTodo={id: Date.now(), text};
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput('');
    };
  };

  const completeTodo=(todo: TTodo) : void => {
    setTodos(prevTodos => prevTodos.filter((t): boolean => t.id 
    !== todo.id));
    setDoneTodos((prevDoneTodos): TTodo[]=> [...prevDoneTodos, todo]);
  
  }
  
  const deleteTodo=(todo: TTodo): void=>{
    setDoneTodos((prevDoneTodo): TTodo[]=> prevDoneTodo.filter((t): boolean => t.id !== todo.id)
    );
  };


  return (
    <div className='todo-container'>
      <h1 className='todo-container__header'>만경 TODO</h1>
      <form onSubmit={handleSubmit} className='todo-container__form'>
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
      <div className='render-container'>
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className='render-container__list'>
          {todos.map((todo): React.ReactElement =>(
          <li key={todo.id} className='render-container__item'>
            <span className='render-container__item-text'>
              {todo.text}
              </span>
            <button
              onClick={() : void =>completeTodo(todo)} 
              style={{
              backgroundColor: '#28a745',
            }} 
            className='render-container__item-button'>완료</button>
          </li>
          ))}

          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className='render-container__list'>
            {doneTodos.map((todo): React.ReactElement =>(
            <li key={todo.id} className='render-container__item'>
              <span className='render-container__item-text'>
                {todo.text}
                </span>
              <button
              onClick={(): void => deleteTodo(todo)} 
              style={{
                backgroundColor: '#dc3545',
              }} 
              className='render-container__item-button'>삭제</button>
            </li>
            ))}

          </ul>
        </div>
      </div> 
    </div> //todo-container
    
 );
};
export default TodoBefore;