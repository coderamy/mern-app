import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=9`
  );
  return {
    data: response.data,
    page
  };
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 0,
    hasMore: true,
    isFetching: false
  },
  reducers: {
    resetPosts: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        state.isFetching = true;
        // console.log('Action:', action, state);
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload.data];
        state.currentPage = action.payload.page;
        state.hasMore = action.payload.data.length >= 1;
        state.isFetching = false;
        // console.log('Action2:', action, state);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isFetching = false;
      });
  }
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;