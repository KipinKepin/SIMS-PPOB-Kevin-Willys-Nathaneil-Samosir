import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
  isLoading: null,
  isError: null,
  isRegistered: null,
  message: null,
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          email: user.email,
          password: user.password,
          last_name: user.lastName,
          first_name: user.firstName,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      state.token = action.payload.data.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(RegisterUser.pending, (state) => {
      state.isLoading = true;
      state.isRegistered = false;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isRegistered = true;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isRegistered = false;
      state.message = action.payload;
    });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
