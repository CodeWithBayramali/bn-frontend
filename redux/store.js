import { configureStore } from "@reduxjs/toolkit";
import managementSlice from "./managementSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        management: managementSlice,
        auth: authSlice
    }
})

export default store