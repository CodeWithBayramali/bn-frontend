import { configureStore } from "@reduxjs/toolkit";
import managementSlice from "./managementSlice";
import authSlice from "./authSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer: {
        management: managementSlice,
        auth: authSlice,
        admin: adminSlice
    }
})

export default store