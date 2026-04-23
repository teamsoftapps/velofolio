import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./slices"; // your combined reducers
import { Auth } from "./apis/Auth"; // RTK Query API slice
import { Common } from "./apis/Common"; // another API slice
import { ClientApi } from "./apis/ClientApi";
import { JobApi } from "./apis/JobApi";
import { TeamApi } from "./apis/TeamApi";
import { InvoiceApi } from "./apis/InvoiceApi";
import { ProductionApi } from "./apis/ProductionApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "invoiceandQuote", "ui"], // persist auth, invoices/quotes, and UI theme
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,  // persisted slices
    [Auth.reducerPath]: Auth.reducer, // RTK Query slices (not persisted)
    [Common.reducerPath]: Common.reducer,
    [ClientApi.reducerPath]: ClientApi.reducer,
    [JobApi.reducerPath]: JobApi.reducer,
    [TeamApi.reducerPath]: TeamApi.reducer,
    [InvoiceApi.reducerPath]: InvoiceApi.reducer,
    [ProductionApi.reducerPath]: ProductionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(Auth.middleware)
      .concat(Common.middleware)
      .concat(ClientApi.middleware)
      .concat(JobApi.middleware)
      .concat(TeamApi.middleware)
      .concat(InvoiceApi.middleware)
      .concat(ProductionApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;