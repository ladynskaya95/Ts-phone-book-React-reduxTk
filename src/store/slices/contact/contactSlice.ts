import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONTACTLIST_URL } from "../../../shared/constants";
import { RootState } from "../../index";

export type ContactItem = {
  id: string,
  name: string,
  phone: string
}

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

export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("contact/deleteContact", async (id, { rejectWithValue }) => {
  const response = await fetch(`${CONTACTLIST_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при удалении: ${response.status} (${response.statusText})`
    );
  }
  return id;
});

export const addContact = createAsyncThunk<
  ContactItem,
  { name: string; phone: string },
  { rejectValue: string }
>("contact/addContact", async (newContact, { rejectWithValue }) => {
  const response = await fetch(CONTACTLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newContact),
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при добавлении: ${response.status} (${response.statusText})`
    );
  }
  return await response.json();
});

export const editContact = createAsyncThunk<
  ContactItem,
  ContactItem,
  { rejectValue: string }
>("contact/editContact", async (editedContact, { rejectWithValue }) => {
  const response = await fetch(`${CONTACTLIST_URL}/${editedContact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedContact),
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при редактировании: ${response.status} (${response.statusText})`
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
      })

      .addCase(deleteContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.list = state.list.filter(
            (contact) => contact.id !== action.payload
          );
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(addContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.list = [...state.list, action.payload];
        }
      })
      .addCase(addContact.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(editContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = state.list.map((contact) => {
            if (contact.id === action.payload.id) {
              return action.payload;
            }
            return contact;
          });
        }
      })
      .addCase(editContact.rejected, (state) => {
        state.status = 'failed';
      });
      
  },
});

export const selectContactList= (state: RootState) => state.contact.list;
export const selectContactStatus = (state: RootState) => state.contact.status;

export default contactSlice.reducer;
