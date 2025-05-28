import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import { CartItems } from "../types/cart";

export interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (state, action: PayloadAction<{id: string}>):void => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem): boolean => cartItem.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },
        decrease: (state, action: PayloadAction<{id: string}>):void => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem): boolean => cartItem.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },
        removeItem: (state, action: PayloadAction<{id: string}>) : void => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter(
                (cartItems) => cartItems.id !== itemId
            );
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            
            state.cartItems.forEach((item) : void => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;

