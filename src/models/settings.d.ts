import { themeOptions } from "@constants/settings";
import { ValueOf } from "./utilities";


export type ThemeOptions = ValueOf<typeof themeOptions>;

export interface SettingsState {
  theme: ThemeOptions;
  settingsModalOpen: boolean;
}