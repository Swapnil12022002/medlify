/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: "user" | "doctor" | "admin";
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

interface SerializedError {
  response?: any;
  message?: string;
  name?: string;
  stack?: string;
  code?: string;
}

interface UserState {
  loading?: boolean;
  user?: User | null;
  appErr?: string;
  serverErr?: string;
}

export const userLoginAction = createAsyncThunk<
  User,
  any,
  { rejectValue: SerializedError }
>("users/login", async (user, { rejectWithValue }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post<User>(
      "http://localhost:8000/api/v1/users/login",
      user,
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error: any) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    const axiosError = error as AxiosError<SerializedError>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      throw error;
    }
  }
});

const localStorageUser = localStorage.getItem("userInfo");
const userInfo = localStorageUser ? JSON.parse(localStorageUser) : null;

const initialState: UserState = {
  user: userInfo,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLoginAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
  },
});

export default userSlice.reducer;
export const selectUserValues = (state: RootState) => state.users;
