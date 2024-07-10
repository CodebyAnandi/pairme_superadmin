import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reportUser: [],
  loading: false,
  error: null,
};

export const fetchReportUser = createAsyncThunk(
  'reportUser/fetchReportUser',
  async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        throw new Error('No token found in local storage');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/admin/getReportUser`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching report user:', error);
      throw error;
    }
  }
);

export const deleteReportUser = createAsyncThunk(
  'reportUser/deleteReportUser',
  async (_id) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}delete/reportUser/${_id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting report user:', error);
      throw error;
    }
  }
);

const reportUserSlice = createSlice({
  name: 'reportUserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportUser.fulfilled, (state, action) => {
        state.loading = false;
        state.reportUser = action.payload;
        state.error = null;
      })
      .addCase(fetchReportUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch report user.';
      })
      .addCase(deleteReportUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportUser.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.reportUser)) {
          state.reportUser = state.reportUser.reportUser.filter(report => report.uid !== action.payload.uid);
        }
        state.error = null;
      })      
      .addCase(deleteReportUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete report user.';
      });
  },
});

export const selectReportUser = (state) => state.reportUserSlice.reportUser;
export const selectReportUserLoading = (state) => state.reportUserSlice.loading;
export const selectReportUserError = (state) => state.reportUserSlice.error;

export default reportUserSlice.reducer;
