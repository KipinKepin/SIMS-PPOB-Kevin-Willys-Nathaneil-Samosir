import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  banner: null,
  isLoading: null,
  isError: null,
  message: null,
};

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`${baseUrl}/banner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBanner.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.banner = action.payload.data;
    });
    builder.addCase(fetchBanner.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload);
    });
  },
});

export default bannerSlice.reducer;
