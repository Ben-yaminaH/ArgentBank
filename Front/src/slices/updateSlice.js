// updateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

// Mise à jour du profil
export const updateUserProfile = createAsyncThunk('update/updateUserProfile', async (userData, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
    return thunkAPI.rejectWithValue(message);
  }
});

const updateSlice = createSlice({
  name: 'update',
  initialState: {
    isUpdating: false,
    updateSuccess: false,
    updateError: null,
  },
  reducers: {
    clearUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isUpdating = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        state.updateError = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearUpdateStatus } = updateSlice.actions;
export default updateSlice.reducer;
