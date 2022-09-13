import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import userReducer from "./slices/user/userSlice";
import contactReducer from "./slices/contact/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
