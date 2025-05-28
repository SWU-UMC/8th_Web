import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Lp } from '../types/cart';
import initialCartItems from '../constants/cartItems'; 

interface CartState {
  cartItems: Lp[];
  total: number;
  amount: number;
  isOpen: boolean;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    cartItems: initialCartItems,
    total: 0,
    amount: 0,
    isOpen: false,

    increase: (id: string) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        ),
      }), false, "cart/increase"),

    decrease: (id: string) => {
      const updated = get().cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      ).filter((item) => item.amount > 0);
      set({ cartItems: updated }, false, "cart/decrease");
    },

    removeItem: (id: string) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
      }), false, "cart/removeItem"),

    clearCart: () => set({ cartItems: [] }, false, "cart/clearCart"),

    calculateTotals: () => {
      const { cartItems } = get();
      const total = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
      const amount = cartItems.reduce((acc, item) => acc + item.amount, 0);
      set({ total, amount }, false, "cart/calculateTotals");
    },

    openModal: () => set({ isOpen: true }, false, "modal/open"),
    closeModal: () => set({ isOpen: false }, false, "modal/close"),
  }))
);
