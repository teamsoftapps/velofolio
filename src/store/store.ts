import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./slices"; // your combined reducers
import { Auth } from "./apis/Auth"; // RTK Query API slice
import { Common } from "./apis/Common"; // another API slice
import invoiceAndQuoteReducer from "./slices/invoiceSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,  // persisted slices
    [Auth.reducerPath]: Auth.reducer, // RTK Query slices (not persisted)
    [Common.reducerPath]: Common.reducer,
    invoiceandQuote: invoiceAndQuoteReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(Auth.middleware)
      .concat(Common.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;