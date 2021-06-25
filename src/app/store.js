import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import countryCompareReducer from '../features/counter/countryCompare/countryCompareSlice';

import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    countryCompare: countryCompareReducer,
    //add reducers here by feature (these will appear in the Redex dev tools)
  },
  middleware: customizedMiddleware,
});
