import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Shell from './components/layout/Shell';
import Spinner from './components/layout/Spinner';
import { GenProvider } from './context/GenContext';

function App() {
  return (
    <GenProvider>
      <MantineProvider>
        <NotificationsProvider>
          <Shell />
          <Spinner />
        </NotificationsProvider>
      </MantineProvider>
    </GenProvider>
  );
}

export default App;
