import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  balance: null,
  isLoading: null,
  isError: null,
  message: null,
};

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`${baseUrl}/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data.balance);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    deductBalance: (state, action) => {
      state.balance -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.balance = action.payload.data.balance;
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { deductBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
