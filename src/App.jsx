import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Shell from './components/Shell';
import Spinner from './components/Spinner';
import { AppContextProvider } from './context/AppContext';
import { Web3ContextProvider } from './context/Web3Context';

function App() {
  return (
    <AppContextProvider>
      <Web3ContextProvider>
        <MantineProvider theme={{ primaryColor: 'indigo' }}>
          <NotificationsProvider>
            <Shell />
            <Spinner />
          </NotificationsProvider>
        </MantineProvider>
      </Web3ContextProvider>
    </AppContextProvider>
  );
}

export default App;
