// src/app/Store/ReduxToolkit/Store.ts

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  cart: string[]; // array of car IDs
}

const initialState: CartState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<string[]>) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, clearCart } = CartSlice.actions
export default CartSlice.reducer
