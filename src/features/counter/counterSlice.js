import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
  cases: [],
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    console.log('hello');
    const response = await fetchCount(amount);
    console.log(response);

    return response;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload.data);
        state.cases = action.payload.data;
      });
  },
});

export default counterSlice.reducer;
