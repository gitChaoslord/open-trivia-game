import MainLayout from '@components/layouts/Main';
import { themeOptions } from '@constants/settings';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from './store';
import { ThemeOptions } from '@models/settings';

const initialLocalThemeState = window.matchMedia('(prefers-color-scheme: dark)').matches ? themeOptions.DARK : themeOptions.LIGHT;

const App: React.FC = () => {
  const [localTheme, setLocalTheme] = React.useState<Exclude<ThemeOptions, typeof themeOptions.SYSTEM>>(initialLocalThemeState);
  const theme = useAppSelector((state) => state.settings.theme);

  const updateLocalTheme = React.useCallback((isDarkMode: boolean) => {
    setLocalTheme(isDarkMode ? themeOptions.DARK : themeOptions.LIGHT);
  }, []);

  React.useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => updateLocalTheme(event.matches));
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', (event) => updateLocalTheme(event.matches));
    }
  }, [updateLocalTheme]);

  return (
    <React.Fragment>

      <ToastContainer
        position="bottom-right"
        limit={1}
        autoClose={4000}
        closeOnClick={true}
        draggable={true}
        pauseOnHover={false}
        theme={theme === themeOptions.SYSTEM ? localTheme : theme}
      />

      <MainLayout />

    </React.Fragment>
  );
}
export default App;