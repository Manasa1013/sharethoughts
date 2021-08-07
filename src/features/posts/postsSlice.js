import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};
const apiServerUrl = "https://apiforstocks-1.manasa1998.repl.co";

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    try {
      const response = await axios.post(apiServerUrl + "/posts", {
        post: newPost,
      });
      console.log(response.data.post, "response.post from addNewPOst thunk");
      return response.data.post;
    } catch (err) {
      console.error("couldn't add the post to server,err is:", err);
      return { err };
    }
  }
);
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(apiServerUrl + "/posts");
    console.log(response, typeof response.status, "from response obj");
    if (response.status === 200) {
      console.log(
        "data can be retrieved",
        response.data.posts,
        "users: at postsSlice",
        response.data.users
      );

      return response.data.posts;
    }
  } catch (err) {
    console.error("fetchPosts catch error ", err);
    return { err };
  } finally {
    console.log("executed finally");
  }
});
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionPressed: (state, action) => {
      const { postID, name } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.postID === postID);

      if (state.posts[postIndex]) {
        state.posts[postIndex].reactions[name] += 1;
      }
    },
    postsUpdated: (state, action) => {
      state.posts.forEach((postItem) => {
        if (postItem.postID === action.payload.postID) {
          postItem.title = action.payload.title;
          postItem.caption = action.payload.caption;
        }
        return postItem;
      });
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload);
    },
    [addNewPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { reactionPressed, saveButtonPressed, postsUpdated } =
  postsSlice.actions;
export default postsSlice.reducer;
export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) => {
  return state.posts.posts.find((post) => post.postID === postId);
};
