import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import updateReducer from '../slices/updateSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    update: updateReducer,

  },
});

export default store;