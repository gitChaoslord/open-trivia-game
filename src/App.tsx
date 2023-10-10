import MainLayout from '@components/layouts/Main';
import { themeOptions } from '@constants/settings';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from './store';
import { ThemeOptions } from '@models/settings';

const darkModePref = window.matchMedia('(prefers-color-scheme: dark)');

const App: React.FC = () => {
  const [localTheme, setLocalTheme] = React.useState<Exclude<ThemeOptions, typeof themeOptions.SYSTEM>>(darkModePref.matches ? themeOptions.DARK : themeOptions.LIGHT);
  const theme = useAppSelector((state) => state.settings.theme);

  const updateLocalTheme = React.useCallback((isDarkMode: boolean) => {
    setLocalTheme(isDarkMode ? themeOptions.DARK : themeOptions.LIGHT);
  }, []);

  React.useEffect(() => {
    darkModePref.addEventListener('change', event => updateLocalTheme(event.matches));
    return () => {
      darkModePref.removeEventListener('change', (event) => updateLocalTheme(event.matches));
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