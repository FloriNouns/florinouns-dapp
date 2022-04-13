import { MantineProvider, Loader } from '@mantine/core';
import Web3 from 'web3';
import Shell from './components/layout/Shell';
import { CONTRACT_ADDRESS, transformMetadata } from './constants';
import F0 from './abi/F0.json';

function App() {
  // const web3 = new Web3(window.ethereum);
  // const collection = new web3.eth.Contract(F0.abi, CONTRACT_ADDRESS);

  return (
    <MantineProvider>
      <Shell />
      <Loader />
    </MantineProvider>
  );
}

export default App;
