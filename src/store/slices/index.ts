import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import invoiceandQuoteReducer from "./invoiceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  invoiceandQuote: invoiceandQuoteReducer,
});

export default rootReducer;
