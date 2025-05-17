// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import  counterReducer  from './counterSlice';
import postsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
    posts: postsReducer, // Ensure this key matches what you use in useSelector
  },
});
