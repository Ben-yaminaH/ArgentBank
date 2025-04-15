import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL de l'API backend 
const API_URL = 'http://localhost:3001/api/v1/user';


// Connexion
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response)
    localStorage.setItem('token', response.data.body.token); // Stocker le token
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


//fetch profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.post(`${API_URL}/profile`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Profil utilisateur :", response.data);
    return response.data.body;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



// Déconnexion
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('token'); // Supprime le token
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
      
  },
});

export default authSlice.reducer;
