import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'cart',
  initialState: {
    orderInit: false,
  },
  reducers: {
    updateOrderInit: (state, action) => {
        return {
            ...state,
            orderInit: action.payload.orderInit,
          };
    }
  },
})

export const { updateOrderInit } = orderSlice.actions;
export default orderSlice.reducer;