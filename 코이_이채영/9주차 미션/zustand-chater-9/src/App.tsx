
import './App.css'
import CartList from './components/CartList'
import Navbar from './components/Navbar'
import PriceBox from './components/PriceBox';
import ConfirmModal from './components/ConfirmModal';

function App() {

  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
      <ConfirmModal />
    </>

  );
};

export default App
