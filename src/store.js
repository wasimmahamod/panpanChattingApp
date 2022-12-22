import { configureStore } from '@reduxjs/toolkit';
import userSlice, { userLoginInfo } from './slices/userSlice';

export default configureStore({
  reducer: {
    userLoginInfo:userSlice
  },
})