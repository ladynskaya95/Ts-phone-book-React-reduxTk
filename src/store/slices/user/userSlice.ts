import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONTACTS_URL } from "../../../shared/constants";

export type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
};

export type UserState = {
  data: UserItem | null;
  status: "idle" | "loading" | "failed";
  error: string | null | undefined;
};

const initialState: UserState = {
  data: JSON.parse(localStorage.getItem("userData") || "{}"),
  status: "idle",
  error: "",
};

export const fetchUsers = createAsyncThunk<
  UserItem,
  string,
  { rejectValue: string }
>('user/fetchUsers', async (userNameFromInput, { rejectWithValue }) => {
  const response = await fetch(CONTACTS_URL);
    if (!response.ok) {
    return rejectWithValue(
      `Что-то пошло не так: ${response.status} (${response.statusText})`
    );
  }

  const usersList: UserItem[] = await response.json();
  const foundUser = usersList.find(
    ({ username }) => username === userNameFromInput
  );

  if (!foundUser) {
    return rejectWithValue('Данный пользователь не существует');
  }

  return foundUser;
  
  })

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder
    .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          localStorage.setItem('userData', JSON.stringify(action.payload));
          state.error = '';
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }});
  },
});

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
