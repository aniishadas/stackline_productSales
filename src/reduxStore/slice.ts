import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../dataType/data';

interface DataState {
  data: ProductData | null;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ProductData>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setError } = dataSlice.actions;
export default dataSlice.reducer;