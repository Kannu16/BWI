// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cartSlice';
import Authenticate from '../slices/Authenticate';


const store = configureStore({
  reducer: {
      cart : cartSlice,
      auth : Authenticate
  }
});

export default store;
