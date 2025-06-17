import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules/billStore";

const store = configureStore({
    reducer:{
        bill: reducer
    }
})

export default store