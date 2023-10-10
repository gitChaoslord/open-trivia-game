import { themeOptions } from "@constants/settings";
import { SettingsState, ThemeOptions } from "@models/settings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SettingsState = {
  theme: themeOptions.SYSTEM,
  settingsModalOpen: false
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    showSettingsModal: (state) => {
      state.settingsModalOpen = true;
    },
    hideSettingsModal: (state) => {
      state.settingsModalOpen = false;
    },
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload;

      switch (action.payload) {
        case themeOptions.LIGHT:
          document.documentElement.classList.add(themeOptions.LIGHT);
          document.documentElement.classList.remove(themeOptions.DARK);
          break;
        case themeOptions.DARK:
          document.documentElement.classList.add(themeOptions.DARK);
          document.documentElement.classList.remove(themeOptions.LIGHT);
          break;
        default:
          document.documentElement.classList.remove(themeOptions.DARK);
          document.documentElement.classList.remove(themeOptions.LIGHT);
          break;
      }
    }
  }
})
export const { setTheme, showSettingsModal, hideSettingsModal } = settingsSlice.actions;
export default settingsSlice.reducer;