
import { useState } from 'react';
import './App.css'

function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 1_000_000; i++) {
    result += i;
  }
  return result;
}

function App() {
  const [count, setCount ] = useState(heavyComputation);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);

  };
  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleIncrease}>증가</button>
    </>
  );
}

export default App;
