import { Provider } from 'react-redux'
import './App.css'
import CartLitst from './components/CartLitst'
import Navbar from './components/Navbar'
import store from './store/store'
import PriceBox from './components/PriceBox'
import Modal from './components/Modal'


function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartLitst/>
      <PriceBox/>
      <Modal/>
    </Provider>
  )
    
}
export default App
