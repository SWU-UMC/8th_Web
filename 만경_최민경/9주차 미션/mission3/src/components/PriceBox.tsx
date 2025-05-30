
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../slices/cartSlice';
import { openModal } from '../slices/modalSlice';

const PriceBox = () => {

    const {total}= useSelector((state)=> state.cart)

    const dispatch=useDispatch();
    const handleInitilizeCart=()=>{
        dispatch(clearCart())
    }
    const handleOpenModal = () => {
        dispatch(openModal());
    };
  return (
    <div className='p-12  flex justify-between '>
        <button onClick={handleOpenModal}
        className='border p-4 rounded-md cursor-pointer'>
            장바구니 초기화
        </button>
    총 가격: {total}원</div>
  )
}

export default PriceBox