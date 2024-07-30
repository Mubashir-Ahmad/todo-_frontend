import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducer/userReducer";
import { todoReducer } from "../reducer/todoReducer";
const store =  configureStore({
    reducer:{
        user: userReducer,
        todo:todoReducer
    }
});
export default store;