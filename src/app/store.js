import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import toastReducer from "../features/toast/toastSlice";
// import postsReducer from "../features/oldposts/postsSlice";
// import usersReducer from "../features/oldusers/usersSlice";
// import notificationsReducer from "../features/oldnotifications/notificationsSlice";

export const store = configureStore(
  {
    reducer: {
      toast: toastReducer,
      // posts: postsReducer,
      // users: usersReducer,
      // notifications: notificationsReducer,
    },
  },
  applyMiddleware(thunk)
);

export default store;
