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
  appErr?: string | undefined;
  serverErr?: string | undefined;
}

const localStorageUser = localStorage.getItem("userInfo");
const userInfo = localStorageUser ? JSON.parse(localStorageUser) : null;

const initialState: UserState = {
  user: userInfo,
};

export const userRegisterAction = createAsyncThunk<
  User,
  any,
  { rejectValue: SerializedError }
>("users/register", async (user, { rejectWithValue }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post<User>(
      "http://localhost:8000/api/v1/users/register",
      user,
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
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

export const userLogOutAction = createAsyncThunk<
  User | undefined,
  any,
  { rejectValue: SerializedError }
>("users/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("userInfo");
    return undefined;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //register
    builder.addCase(userRegisterAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userRegisterAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
    //login
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
    //logout
    builder.addCase(userLogOutAction.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLogOutAction.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userLogOutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
  },
});

export default userSlice.reducer;
export const selectUserValues = (state: RootState) => state.users;
