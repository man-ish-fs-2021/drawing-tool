import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../slice/Menu";

export const Store = configureStore({
  reducer: {
    menu: MenuReducer,
  },
});

export type AppStore = typeof Store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
