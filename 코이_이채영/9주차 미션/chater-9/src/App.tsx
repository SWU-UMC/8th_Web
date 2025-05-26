import { Provider } from 'react-redux'
import './App.css'
import CartList from './components/CartList'
import Navbar from './components/Navbar'
import PriceBox from './components/PriceBox';
import store from './store/store';
import ConfirmModal from './components/ConfirmModal';

function App() {

  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox />
      <ConfirmModal />
    </Provider>
  );
};

export default App
