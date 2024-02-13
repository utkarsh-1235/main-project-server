import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";

// import courseSlice from "./Slice/courseSlice";

const store = configureStore({
    reducer: {
       auth: authSlice,
    //    course: courseSlice
    },
    devTools: true
})

export default store