import { useState } from 'react';

function App() {

  const [person, setPerson] = useState({
    name: '김정현',
    age: 23,
    nickname: '현',
    city: '',
  });
   // city 값을 새로 추가하여 업데이트하는 함수
  const updateCity = () => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      city: '서울', 
    }));
  };

  // age 값을 1씩 증가시키는 함수
  const increaseAge = () => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      age: prevPerson.age + 1,
    }));
  };

  return (
    <>
      <h1>이름: {person.name}</h1>
      <h2>나이: {person.age}</h2>
      <h3>닉네임: {person.nickname}</h3>
      {person.city && <h4>도시: {person.city}</h4>}
      <button onClick={updateCity}>도시 추가</button>
      <button onClick={increaseAge}>나이 증가</button>
    </>
  );
}

export default App;
