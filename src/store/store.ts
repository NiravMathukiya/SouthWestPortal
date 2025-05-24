import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "@/store/slices/sidebarSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      sidebar: sidebarReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
