import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../redux/CartSlice";
import ProductReducer from "../redux/ProductSlice";

export default configureStore({
    reducer:{
        cart:CartReducer,
        product:ProductReducer
    }
})

