import MainLayout from '@components/layouts/Main';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from './store';
import { themeOptions } from '@constants/settings';

const App: React.FC = () => {
  const theme = useAppSelector((state) => state.settings.theme);

  return (
    <React.Fragment>

      {/* TODO: run media query check to apply dark or light to props */}
      <ToastContainer
        position="bottom-right"
        limit={1}
        autoClose={4000}
        closeOnClick={true}
        draggable={true}
        pauseOnHover={false}
        theme={theme === themeOptions.SYSTEM ? undefined : theme}
      />

      <MainLayout />

    </React.Fragment>
  );
}
export default App;