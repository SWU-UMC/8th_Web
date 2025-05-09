import './App.css';
import React from 'react';
import Todo from './components/Todo';
import { TodoProvider } from './context/TodoContext';


function App() : React.ReactElement {
  return ( 
  <TodoProvider>
    <Todo />   
  </TodoProvider>
  );
}
export default App;