import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

export const store = configureStore(
  {
    reducer: {
      posts: postsReducer,
      users: usersReducer,
      notifications: notificationsReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
