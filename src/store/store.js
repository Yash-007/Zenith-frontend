import { configureStore } from '@reduxjs/toolkit';
import challengeReducer from './slices/challengeSlice';
import categoryReducer from './slices/categorySlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
    categories: categoryReducer,
  },
});

export default store;
