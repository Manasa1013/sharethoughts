import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../toast/toastSlice";

const initialState = {
  token: JSON.parse(localStorage.getItem("userData"))?.token || "",
  user: JSON.parse(localStorage.getItem("userData"))?.user || "",
  isLoading: false,
};
export const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        username,
        password,
      });
      console.log(response, "at signupJandler after sending req");
      if (response.status === 200) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: response.data.encodedToken,
            user: response.data.foundUser,
          })
        );
        showToast("Logged in successfully");

        return fulfillWithValue(response.data.success);
      }
    } catch (err) {
      showToast("Error at logging in");

      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);
export const signupHandler = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, username, password }, { rejectWithValue }) => {
    try {
      const { status, data } = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        username,
        password,
      });
      console.log("checking after post statement", await data);
      if (status === 201) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: data.encodedToken,
            user: data.createdUser,
          })
        );
        showToast("Signed up successfully");

        return data;
      }
    } catch (err) {
      showToast("Error at signing up");

      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);
// export const signupHandler = createAsyncThunk(
//   "auth/signup",
//   async (
//     { firstName, lastName, username, password },
//     { fulfillWithValue, rejectWithValue }
//   ) => {
//     try {
//       console.log("checking if the handler is getting invoked");
//       const { status, data } = await axios.post(`/api/auth/signup`, {
//         firstName,
//         lastName,
//         username,
//         password,
//       });
//       console.log(await data, "at signup thunk");
//       if (status === 201) {
//         localStorage.setItem(
//           "userData",
//           JSON.stringify({
//             token: data.encodedToken,
//             user: data.createdUser,
//           })
//         );
//         return fulfillWithValue(data.success);
//       }
//     } catch (err) {
//       return rejectWithValue(err.response.data.errors[0]);
//     }
//   }
// );

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      showToast("Logged out successfully");

      localStorage.removeItem("userData");
      state.token = "";
      state.user = {};
    },
  },
  extraReducers: {
    [loginHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [loginHandler.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.encodedToken;
      state.user = action.payload.foundUser;
    },
    [loginHandler.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [signupHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [signupHandler.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.token = action.payload.encodedToken;
      state.user = action.payload.createdUser;
    },
    [signupHandler.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(state, "at signupHandler rejectd", action.payload);
    },
  },
});

export const selectAuth = (state) => state;
export const { logoutHandler } = authenticationSlice.actions;
export default authenticationSlice.reducer;
