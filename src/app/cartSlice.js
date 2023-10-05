import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalAmount: 0
  },
  reducers: {
    get: (state, action) => {
        return {
            ...state,
            items: action.payload.items,
            totalPrice: action.payload.totalPrice,
            totalAmount: action.payload.totalAmount
          };
    }
  },
})

export const { get } = cartSlice.actions;
export default cartSlice.reducer;