import { configureStore } from "@reduxjs/toolkit";
import categoryReducers from "./reducers/categoryReducers";
import authReducer from "./reducers/authReducers";
import productReducers from "./reducers/productReducers";
import userReducers from "./reducers/userReducers";
import sliderReducers from "./reducers/sliderReducers";
import orderReducers from "./reducers/orderReducers";
import couponReducers from "./reducers/couponReducers";
import menuReducers from "./reducers/menuReducers";
import topicReducers from "./reducers/topicReducers";
import pageReducers from "./reducers/pageReducers";
import brandReducers from "./reducers/brandReducers";
import contactReducers from "./reducers/contactReducers";

export default configureStore({
    reducer: {
        categoryReducers,
        authReducer,
        productReducers,
        userReducers,
        sliderReducers,
        orderReducers,
        couponReducers,
        menuReducers,
        topicReducers,
        pageReducers,
        brandReducers,
        contactReducers
    }
})
