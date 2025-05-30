import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItem';
import { CartItems } from './../types/cart';

export interface CartState {
    cartItems: CartItems; // 소문자로 통일
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems, // 이제 일치함
    amount: 0,
    total: 0, 
}

//cartSlice 생성
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        //Todo: 증가
        increase:(state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            
            if(item){
                item.amount += 1;
            }
        },

        //Todo: 감소
        decrease:(state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            
            if(item && item.amount > 0){
                item.amount -= 1;
            }
        },

        //Todo: removeItem 아이템 제거 
        removeItem: (state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        },

        //Todo: 전체 장바구니 비우기
        clearCart: (state) => {
            state.cartItems = [];
        },

        //Todo: 총액 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount *  Number(item.price);
            });

            state.amount = amount;
            state.total = total;
        }
    }
});

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;

//duck pattern reducer는 export default로 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;
