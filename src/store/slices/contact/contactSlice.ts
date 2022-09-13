import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONTACTLIST_URL } from "../../../shared/constants";
import { RootState } from "../../index";

type ContactItem = {
  id: string,
  name: string,
  phone: string}


export type ContactState = {
  list: ContactItem[];
  status: "idle" | "loading" | "failed";
};

const initialState: ContactState = {
  list: [],
  status: "idle" 
};

export const fetchContacts = createAsyncThunk<
  ContactItem[],
  void,
  { rejectValue: string }
>("contact/fetchContacts", async (_, { rejectWithValue }) => {
  const response = await fetch(CONTACTLIST_URL);

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при получении контактов: ${response.status} (${response.statusText})`
    );
  }

  return await response.json();
});

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases for fethings contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.list = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectContactList= (state: RootState) => state.contact.list;

export default contactSlice.reducer;
