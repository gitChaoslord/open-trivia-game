import { themeOptions } from '@constants/settings';
import store, { persistor } from '@store/index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
// index css should be imported before importing root component to prevent overwrite of certain classes, e.g. button bg-primary with bg-transparent from tailwind defaults
// source:  https://github.com/tailwindlabs/tailwindcss/discussions/7304#discussioncomment-2256226
import App from './App';

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
