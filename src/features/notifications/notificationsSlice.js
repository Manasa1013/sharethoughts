import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notifications: [],
  status: "idle",
  error: null,
};
const apiServerUrl = "https://apiforstocks-1.manasa1998.repl.co";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    try {
      const response = await axios.get(apiServerUrl + "/notifications");
      console.log(response.data, "form notifications");
      if (response.status === 200) {
        console.log("notifs can be retrieved", response.data.notificationsData);
        return response.data.notificationsData;
      }
    } catch (err) {
      console.error("fetchNotifs catch error ", err);
      return { err };
    } finally {
      console.log("executed finally from fetchNotifs");
    }
  }
);
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.notifications = state.notifications.concat(action.payload);
    },
    [fetchNotifications.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default notificationsSlice.reducer;
