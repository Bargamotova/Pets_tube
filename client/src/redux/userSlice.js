import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user: null,
  loading: false,
  error: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      return initialState;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            channelId => channelId === action.payload
          ),
          1)
      } else {
        state.currentUser.subscribedUsers.push(action.payload)
      }
    },
    updateChannel: (state, action) => {
      state.currentUser = action.payload;
    }
  },

});
export const { loginStart, loginFailure, loginSuccess, logOut, subscription, updateChannel } = userSlice.actions;
export default userSlice.reducer;
