import { create } from "zustand";
import { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItem";
import { useShallow } from "zustand/shallow";

interface CartActions {
    increase: (id:string)=> void;
    decrease: (id:string)=> void
    removeItem: (id:string)=> void
    clearCart: ()=> void
    calculateTotals: ()=> void
}

interface CartState{
    cartItems: CartItems;
    amount: number;
    total: number;
    actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set, _): CartState => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.amount -= 1;
            if (item && item.amount <= 0) {
              // 개수가 0 이하이면 제거
              state.cartItems = state.cartItems.filter((i) => i.id !== id);
            }
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
       clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price);
          });
          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

export const useCartInfo=()=> useCartStore(useShallow((state)=>({
    cartItems: state.cartItems,
    amount: state.amount,
    total: state.total,
}))
)

export const useCartActions = () => useCartStore((state): CartActions=> state.actions);
  
