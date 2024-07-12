import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the slice
const initialState = {
  userInfo: null,
  allUsers: null,
  deletedUsers: null,
  allSubAdmin: null, // Correct state for all sub admins
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
          Authorization: `Bearer ${token}`,  // Assuming Bearer token authentication
        },
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/admin/loggedUserInfo`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching logged user info:', error);
      throw error;
    }
  }
);

// Define the async thunk to fetch all users
export const getAllUsers = createAsyncThunk(
  'loggedUser/fetchAllUsers',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/user_data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
);

// Define the async thunk to fetch all deleted users
export const getAllDeletedUsers = createAsyncThunk(
  'loggedUser/fetchAllDeletedUsers',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/allDeletedUser`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all deleted users:', error);
      throw error;
    }
  }
);

export const getAllSubAdmin = createAsyncThunk(
  'loggedUser/getAllSubAdmin',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}admin/getAllDeletedSubAdmin`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all sub admins:', error);
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error state on pending
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all users.';
      })
      .addCase(getAllDeletedUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error state on pending
      })
      .addCase(getAllDeletedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedUsers = action.payload;
        state.error = null;
      })
      .addCase(getAllDeletedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all deleted users.';
      })
      .addCase(getAllSubAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error state on pending
      })
      .addCase(getAllSubAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubAdmin = action.payload; // Update allSubAdmin state with fetched data
        state.error = null;
      })
      .addCase(getAllSubAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all sub admins.';
      });
  },
});

// Export the slice's reducer and selectors
export const selectUserInfo = (state) => state.loggedUser.userInfo;
export const selectAllUsers = (state) => state.loggedUser.allUsers;
export const selectDeletedUsers = (state) => state.loggedUser.deletedUsers;
export const selectAllSubAdmin = (state) => state.loggedUser.allSubAdmin;
export default loggedUserSlice.reducer;
