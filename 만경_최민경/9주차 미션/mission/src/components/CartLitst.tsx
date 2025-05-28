
import CartItem from "./CartItem"

import { useSelector } from "../hooks/useCustomRedux"



const CartLitst = (): React.ReactElement => {
    const {cartItems,amount,total}= useSelector(
        (state)=> state.cart)
    

  return (
    <div className="flex flex-col items-center justify-center">
        <ul>{cartItems.map((item): React.ReactElement =>(
            <CartItem key={item.id} lp={item} />
        ))}
        </ul>
    </div>
  ) 
}

export default CartLitst