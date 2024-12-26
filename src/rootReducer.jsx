
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  user: userSlice
});

export default rootReducer;