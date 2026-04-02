import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  activeWorkspaceId: string | null;
  globalSearchOpen: boolean;
}

const initialState: UiState = {
  isSidebarOpen: true, // Defaulting Sidebar to open on desktop
  theme: 'light',
  activeWorkspaceId: null,
  globalSearchOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setActiveWorkspaceId: (state, action: PayloadAction<string>) => {
      state.activeWorkspaceId = action.payload;
    },
    toggleGlobalSearch: (state) => {
      state.globalSearchOpen = !state.globalSearchOpen;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setActiveWorkspaceId,
  toggleGlobalSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
