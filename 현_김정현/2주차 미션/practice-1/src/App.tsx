import './App.css'
// List Component Import
import List from './components/List';

function App() {
  const nickname = '현'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
    <>
      <strong className='school'>서울여자자대학교</strong>
      <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>
        {nickname}/김정현
      </p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho, idx) => (
          // </li> -> List 컴포넌트 호출
          <List key={idx} tech={yaho} />
        ))}
      </ul>
    </>
  )
}

export default App
