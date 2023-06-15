import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: false,
  foundUsers: [],
};
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users");
      if (response.status === 200) return response.data.users;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ token, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/users/edit",
        { user },
        { headers: { authorization: token } }
      );
      if (response.status === 201) return response.data.user; // user returned from mock backend
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//follow user thunk
export const followUser = createAsyncThunk(
  "user/follow",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        { headers: { authorization: token } }
      );
      if (response.status === 200) return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// unfollow user thunk
export const unFollowUser = createAsyncThunk(
  "user/unfollow",
  async ({ followUserId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        { headers: { authorization: token } }
      );
      if (response.status === 200) return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    //get user
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    // TODO : update user details
    //follow user
    [followUser.pending]: (state) => {
      state.isLoading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.username === action.payload.followUser.username) {
          console.log(action.payload.followUser);
          return action.payload.followUser;
        }
        if (user.username === action.payload.user.username) {
          console.log(action.payload.user);
          return action.payload.user;
        }
        return user;
      });
      state.isLoading = false;
    },
    [followUser.rejected]: (state) => {
      state.isLoading = false;
    },

    //un follow user
    [unFollowUser.pending]: (state) => {
      state.isLoading = true;
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.username === action.payload.followUser.username) {
          console.log(action.payload.followUser);
          return action.payload.followUser;
        }
        if (user.username === action.payload.user.username) {
          console.log(action.payload.user);
          return action.payload.user;
        }
        return user;
      });
    },
    [unFollowUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading } = userSlice.actions;

export default userSlice.reducer;
