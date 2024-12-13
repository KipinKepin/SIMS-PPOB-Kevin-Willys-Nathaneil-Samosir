import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: {},
  isLoading: null,
  isError: null,
  message: null,
};

const baseUrl = "https://take-home-test-api.nutech-integrasi.com";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${baseUrl}/profile`, {
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

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `${baseUrl}/profile/update`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async (file, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(`${baseUrl}/profile/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.profile = action.payload.data;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.profile = { ...state.profile, ...action.payload.data };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateProfileImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Failed to update profile image";
    });
  },
});

export default profileSlice.reducer;
