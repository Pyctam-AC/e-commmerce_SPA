import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  images: string[];
  currentImageIndex: number;
}

const initialState: PopupState = {
  isOpen: false,
  images: [],
  currentImageIndex: 0,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<string[]>) => {
      state.isOpen = true;
      state.images = action.payload;
      state.currentImageIndex = 0;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.images = [];
      state.currentImageIndex = 0;
    },
    nextImage: (state) => {
      state.currentImageIndex = (state.currentImageIndex + 1) % state.images.length;
    },
    prevImage: (state) => {
      state.currentImageIndex = (state.currentImageIndex - 1 + state.images.length) % state.images.length;
    },
  },
});

export const { openPopup, closePopup, nextImage, prevImage } = popupSlice.actions;

export default popupSlice.reducer;

