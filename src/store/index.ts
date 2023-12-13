import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup.slice';
import cartSlice from './cart.slice';
import sizeSelectSlice from './sizeSelect.slice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    cart: cartSlice,
    sizeSelect: sizeSelectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


