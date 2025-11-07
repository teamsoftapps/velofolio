import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./slices"; // your combined reducers
import { Auth } from "./apis/Auth"; // your RTK Query API slice


const persistConfig = {
  key: "root",
  storage,
  blacklist: [Auth.reducerPath], // do NOT persist RTK Query reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persisted: persistedReducer,

    [Auth.reducerPath]: Auth.reducer, // RTK Query reducer must be added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(Auth.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
