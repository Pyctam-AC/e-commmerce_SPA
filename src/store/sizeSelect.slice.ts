import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SizeSelectState {
  selectedSizes: Record<string, string | null>;
}

const initialState: SizeSelectState = {
  selectedSizes: {},
};

const sizeSelectSlice = createSlice({
  name: 'sizeSelect',
  initialState,
  reducers: {
    isSelect: (state, action: PayloadAction<{ cardId: string; sizeName: string }>) => {
      const { cardId, sizeName } = action.payload;
      state.selectedSizes = {
        ...state.selectedSizes,
        [cardId]: sizeName,
      };
    },
    notSelect: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      state.selectedSizes = {
        ...state.selectedSizes,
        [cardId]: null,
      };
    },
  },
});

export const { isSelect, notSelect } = sizeSelectSlice.actions;
export default sizeSelectSlice.reducer;
