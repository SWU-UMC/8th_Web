
import CartItem from "./CartItem"


import { useCartActions, useCartInfo } from "../hooks/useCartStore"



const CartLitst = (): React.ReactElement => {
    const {cartItems}=useCartInfo()
    const {clearCart}=useCartActions();

    const handleAllClearButton=()=>{
      (clearCart())
    }
    
    

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