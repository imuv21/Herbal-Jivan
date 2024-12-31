
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import searchSlice from './slices/searchSlice';
import categorySlice from './slices/categorySlice';
import cartSlice from './slices/cartSlice';


const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  user: userSlice,
  search: searchSlice,
  category: categorySlice,
  cart: cartSlice
});

export default rootReducer;