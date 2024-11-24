import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUserResponse, UserDataType } from "../interfaces/interfaces";
import { RootState } from "../app/store";
import axios from "axios";

export const fetchUsers = createAsyncThunk<
  FetchUserResponse,
  void,
  { rejectValue: string; state: RootState }
>("users/fetchUsers", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { page, limit } = state.users;

  try {
    const response = await axios.get(`https://reqres.in/api/users`, {
      params: { page, per_page: limit },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

export const deleteUserThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("users/deleteUser", async (userId, thunkAPI) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${userId}`);
    return userId;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to delete user"
    );
  }
});

export const updateUserThunk = createAsyncThunk<
  { userId: number; updatedData: UserDataType },
  { userId: number; updatedData: UserDataType },
  { rejectValue: string }
>("users/updateUser", async ({ userId, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(
      `https://reqres.in/api/users/${userId}`,
      updatedData
    );
    return { userId, updatedData: response.data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update user"
    );
  }
});

export const createUserThunk = createAsyncThunk<
  { userId: number; userData: UserDataType },
  { userData: UserDataType },
  { rejectValue: string }
>("users/createUser", async ({ userData }, thunkAPI) => {
  try {
    const userId = Date.now();
    const response = await axios.put(
      `https://reqres.in/api/users/${userId}`,
      userData
    );

    return { userId, userData: response.data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to create user"
    );
  }
});
