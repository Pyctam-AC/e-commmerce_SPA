import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup.slice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


