import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (!existingItem) {
        // If item is not in the cart, add it
        state.cartItems.push({ ...newItem, quantity: 1});
      } else {
        // If item is already in the cart, update its quantity
        existingItem.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(item => item.id === itemId);

      if (existingItem) {
        // If item is in the cart, decrease its quantity
        existingItem.quantity -= 1;

        // If quantity becomes zero, remove the item from the cart
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        }
      }
    },
    emptyCart : (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
