import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  token: "",
  isLoggedIn: false,
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    logout: (state) => {
      sessionStorage.clear();
      state.token = null;
      state.mode = "light";
    },
  },
});
export const { setToken, setMode, logout } = slice.actions;
export default slice.reducer;
