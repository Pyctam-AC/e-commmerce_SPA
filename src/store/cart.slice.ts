import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  nameProduct: string;
  colorName: string;
  sizeName: string;
  photo: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  length: number;
}

const initialState: CartState = {
  items: [],
  length: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.length = state.items.length;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.items.length) {
        state.items.splice(indexToRemove, 1);
        state.length = state.items.length;
      }
    },
  },
});

export type {CartItem, CartState}

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

