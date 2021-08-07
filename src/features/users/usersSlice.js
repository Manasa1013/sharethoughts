import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];
// users: [],
// { };
//todo : make users an array in initialState
const apiServerUrl = "https://apiforstocks-1.manasa1998.repl.co";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(apiServerUrl + "/posts");
    console.log(response.data.users, "users array from usersSlice");
    return response.data.users;
  } catch (err) {
    console.error("error occured in fetching users", err);
  } finally {
    console.log("from finally of usersSlice");
  }
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      const actionPayload = action.payload;
      return actionPayload;
    },
  },
});

export const selectAllUsers = (state) => state.users;

export const selectUserById = ({ state, userID }) =>
  state.users.find((user) => user.userID === userID);

export default usersSlice.reducer;
