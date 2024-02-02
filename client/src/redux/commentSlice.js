import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  comments: [],
  loading: false,
  error: false
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentStart: (state) => {
      state.loading = true;
    },
    commentSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    commentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    commentAdd: (state, action) => {
      state.comments.push(action.payload)
    },
    commentDelete: (state, action) => {
      state.comments = state.comments.filter(comment => comment._id !== action.payload)
    },
  }
}
);
export const { commentStart, commentFailure, commentSuccess, commentAdd, commentDelete } = commentSlice.actions;
export default commentSlice.reducer;
