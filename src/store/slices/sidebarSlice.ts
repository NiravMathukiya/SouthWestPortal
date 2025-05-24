import { createSlice } from "@reduxjs/toolkit";

// Define the type for the state
// sidebarSlice.ts
interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true, // default to true; we'll override it in the component
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state: SidebarState) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state: SidebarState) => {
      state.isOpen = true;
    },
    closeSidebar: (state: SidebarState) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
