import { configureStore } from '@reduxjs/toolkit';
import challengeReducer from './slices/challengeSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    challenges: challengeReducer,
    categories: categoryReducer,
  },
});

export default store;
