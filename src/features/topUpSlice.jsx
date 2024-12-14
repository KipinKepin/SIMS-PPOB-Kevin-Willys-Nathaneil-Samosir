import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: null,
  isLoading: null,
  isError: null,
  message: null,
};

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const topUpBalance = createAsyncThunk(
  "topUp/topUpBalance",
  async (topUpAmount, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        `${baseUrl}/topup`,
        {
          top_up_amount: topUpAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const topUpSlice = createSlice({
  name: "topUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(topUpBalance.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(topUpBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.amount = action.payload.data.balance;
    });
    builder.addCase(topUpBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default topUpSlice.reducer;
