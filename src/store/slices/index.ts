import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import invoiceandQuoteReducer from "./invoiceSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  invoiceandQuote: invoiceandQuoteReducer,
  ui: uiReducer,
});

export default rootReducer;
