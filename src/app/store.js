import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import profileReducer from "../features/profileSlice";
import balanceReducer from "../features/balanceSlice";
import servicesReducer from "../features/servicesSlice";
import bannerReducer from "../features/bannerSlice";
import topUpReducer from "../features/topUpSlice";
import transactionReducer from "../features/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    services: servicesReducer,
    banner: bannerReducer,
    topUp: topUpReducer,
    transactions: transactionReducer,
  },
});
