import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deductBalance } from "./balanceSlice";

const initialState = {
  transactions: { records: [] },
  offset: 0,
  limit: 5,
  isLoading: false,
  isError: null,
  message: null,
};

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { offset, limit } = state.transactions;
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`${baseUrl}/transaction/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { offset, limit },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async ({ serviceId, tariff }, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const invoice = `INV-${Date.now()}`;
      const response = await axios.post(
        `${baseUrl}/transaction`,
        {
          service_code: serviceId,
          transaction_type: "PAYMENT",
          amount: tariff,
          invoice_number: invoice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      thunkAPI.dispatch(deductBalance(tariff));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    incrementOffset(state) {
      state.offset += state.limit;
    },
    resetOffset(state) {
      state.offset = 0;
      state.transactions.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      const newTransaction = action.payload.data;
      state.transactions.records = [
        newTransaction,
        ...state.transactions.records,
      ];
    });

    builder.addCase(createTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const newRecords = action.payload.records;
      state.transactions.records = [
        ...state.transactions.records,
        ...newRecords.filter(
          (newRecord) =>
            !state.transactions.records.some(
              (oldRecord) =>
                oldRecord.invoice_number === newRecord.invoice_number
            )
        ),
      ];
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { incrementOffset } = transactionSlice.actions;
export default transactionSlice.reducer;
