// loggedUserSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the slice
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

// Define the async thunk to fetch logged user info
export const fetchLoggedUserInfo = createAsyncThunk(
  'loggedUser/fetchUserInfo',
  async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        throw new Error('No token found in local storage');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`  // Assuming Bearer token authentication
        }
      };

      const response = await axios.get('http://localhost:3334/api/admin/loggedUserInfo', config);
      return response.data;
    } catch (error) {
      console.error('Error fetching logged user info:', error);
      throw error;
    }
  }
);

// Create the slice using createSlice
const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error state on pending
      })
      .addCase(fetchLoggedUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchLoggedUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch logged user info.';
      });
  },
});

// Export the slice's reducer and actions
export const selectUserInfo = (state) => state.loggedUser.userInfo;
export default loggedUserSlice.reducer;
