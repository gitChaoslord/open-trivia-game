import store, { persistor } from '@store/index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { themeOptions } from '@constants/settings';

const handleAfterHydration = () => {
  const theme = store.getState().settings.theme;
  switch (theme) {
    case themeOptions.LIGHT:
      document.documentElement.classList.add(themeOptions.LIGHT)
      break;
    case themeOptions.DARK:
      document.documentElement.classList.add(themeOptions.DARK)
      break;
    default:
      break;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={handleAfterHydration} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode >);
