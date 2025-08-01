import { create } from "zustand";
import type { CartItems } from "../types/cart.ts";
import cartItems from "../constants/cartItems.ts";
import { useShallow } from "zustand/shallow";
import { immer } from "zustand/middleware/immer";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create(
  immer<CartState>((set) => ({
    cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) =>
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) item.amount += 1;
        }),

      decrease: (id: string) =>
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item && item.amount > 0) item.amount -= 1;
        }),

      removeItem: (id: string) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }),

      clearCart: () =>
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        }),

      calculateTotals: () =>
        set((state) => {
          let total = 0;
          let amount = 0;
          state.cartItems.forEach((item) => {
            total += Number(item.price) * item.amount;
            amount += item.amount;
          });
          state.total = total;
          state.amount = amount;
        }),
    },
  })),
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);