import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    },
    logout: (state) => {
      return {
        ...state,
        username: null,
        userId: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
