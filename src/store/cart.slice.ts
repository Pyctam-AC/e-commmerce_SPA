import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  nameProduct: string;
  colorName: string;
  sizeName: string;
  photo: string;
  price: string;
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
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.items.length) {
        state.items.splice(indexToRemove, 1);
      }
    },
    addCount: (state, action: PayloadAction<number>) => {
      state.length = action.payload;
    }
  },
});

export type {CartItem, CartState}

export const { addToCart, removeFromCart, addCount } = cartSlice.actions;

export default cartSlice.reducer;

