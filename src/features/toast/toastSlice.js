import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: "hide",
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    hideToast: (state) => {
      state.isVisible = "hide";
      state.message = "";
    },
    showToast: (state, action) => {
      state.isVisible = "show";
      state.message = action.payload;
    },
  },
});

export const { hideToast, showToast } = toastSlice.actions;

export const selectToast = (state) => state.toast;

export default toastSlice.reducer;
