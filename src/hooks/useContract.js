import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { showNotification } from '@mantine/notifications';
import Web3 from 'web3';
import Web3Context from '../context/Web3Context';
import F0 from '../abi/F0.json';

const useContract = () => {
  const { setLoading } = useContext(Web3Context);
  const [contract, setContract] = useState(null);
  const [supply, setSupply] = useState(null);
  const [base, setBase] = useState(null);

  useEffect(() => {
    const connectToContract = () => {
      // Declare provider
      let provider;

      // If user is on correct chain, set MetaMask as provider
      if (
        window.ethereum &&
        window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
      ) {
        provider = window.ethereum;
      } else {
        // else if contract on mainnet, use infura mainnet
        if (process.env.REACT_APP_CHAIN_ID === 1)
          provider = process.env.REACT_APP_MAINNET_JSONRPC;
        // else use infura rinkeby
        provider = process.env.REACT_APP_RINKEBY_JSONRPC;
      }

      const web3 = new Web3(provider);
      setContract(
        () => new web3.eth.Contract(F0, process.env.REACT_APP_CONTRACT_ADDRESS)
      );
    };

    if (!contract) connectToContract();
  }, [contract]);

  // gets config from contract (check factoria dev docs)
  // TODO get other things from contract here if needed
  const getConfig = useCallback(async () => {
    if (!contract) return;

    setLoading(() => true);

    try {
      // get config from contract
      const config = await contract.methods.config().call();
      // set supply and base from config
      setSupply(() => config.supply);
      setBase(() => config.base);
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        title: 'Something went wrong...',
        message: "We couldn't connect to the contract :(",
        color: 'red',
      });
    }

    setLoading(() => false);
  }, [contract, setLoading]);

  // TODO set return for anything we add later
  return useMemo(() => {
    return { supply, base, getConfig };
  }, [supply, base, getConfig]);
};

export default useContract;
