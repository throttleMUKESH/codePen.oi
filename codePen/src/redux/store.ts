import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slice/compilerSlice";
import { api } from "./slice/api";
import appSlice from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice,
    appSlice
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
