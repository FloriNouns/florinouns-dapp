import { MantineProvider, Loader } from '@mantine/core';
import Shell from './components/layout/Shell';

function App() {
  return (
    <MantineProvider>
      <Shell />
      <Loader />
    </MantineProvider>
  );
}

export default App;
