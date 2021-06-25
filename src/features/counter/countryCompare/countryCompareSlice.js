import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAmericaData } from './countryCompareApi';

const initialState = {
  value: 0,
  status: 'idle',
  unitedStates: [],
};

export const incrementAsync = createAsyncThunk(

    'countryCompare/fetchAmericaData',
    async (todaysDate) => {
    console.log(todaysDate);
    var today = todaysDate.date2;
    var weekStartDate = todaysDate.date1;


    const response = await fetchAmericaData(today, weekStartDate);
    // console.log(response);
    
    return response;
  }
);

export const countryCompareSlice = createSlice({
  name: 'countryCompare',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'rejected';
        console.log(action.payload.data);

      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.unitedStates = action.payload.data;
      });
  },
});


export default countryCompareSlice.reducer;
