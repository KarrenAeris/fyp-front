import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "44490e11dc29893ec42fddf918804b9cfab500d5",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
