import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchUserResponse, UsersState } from "../interfaces/interfaces";
import { RootState } from "../app/store";
import {
  createUserThunk,
  deleteUserThunk,
  fetchUsers,
  updateUserThunk,
} from "./thunks";

const initialState: UsersState = {
  usersList: [],
  page: 1,
  limit: 5,
  total_pages: 1,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<FetchUserResponse>) => {
          state.status = "succeeded";
          state.usersList = action.payload.data;
          state.total_pages = action.payload.total_pages;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = state.usersList.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete user";
      });

    builder
      .addCase(createUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userId, userData } = action.payload;
        state.usersList = [{ ...userData, id: userId }, ...state.usersList];
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to create user";
      });

    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userId, updatedData } = action.payload;
        const userIndex = state.usersList.findIndex(
          (user) => user.id === userId
        );
        if (userIndex >= 0) {
          state.usersList[userIndex] = {
            ...state.usersList[userIndex],
            ...updatedData,
          };
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update user";
      });
  },
});

export default userSlice.reducer;

export const { setPage, setLimit } = userSlice.actions;

export const users = (state: RootState) => state.users;
