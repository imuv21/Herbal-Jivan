
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice
});

export default rootReducer;