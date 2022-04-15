import { createContext, useReducer } from 'react';
import { showNotification } from '@mantine/notifications';
import genReducer from './GenReducer';

const GenContext = createContext();

export const GenProvider = ({ children }) => {
  const initialState = {
    currentAccount: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(genReducer, initialState);

  // check for connected wallet and set current account
  const checkWallet = async () => {
    if (!window.ethereum) return;

    setLoading(true);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length !== 0) {
        const account = accounts[0];
        dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: account });
      }
    } catch (e) {
      if (e.code === 4001) {
        showNotification({
          title: 'Please connect to MetaMask.',
        });
      } else console.error(e);
    }

    setLoading(false);
  };

  // MetaMask popup to connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      showNotification({
        title: 'You need MetaMask to connect your wallet.',
      });
      return;
    }

    setLoading(true);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const account = accounts[0];

      dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: account });
    } catch (e) {
      if (e.code === 4001) {
        showNotification({
          title: 'Please connect to MetaMask.',
        });
      } else {
        console.error(e);
      }
    }

    setLoading(false);
  };

  // If in prod check for mainnet, otherwise check for rinkeby
  const checkNetwork = async () => {
    if (!window.ethereum) return;

    try {
      if (window.ethereum.networkVersion !== process.env.REACT_APP_CHAIN_ID) {
        showNotification({
          title: `Make sure you're on ${
            process.env.REACT_APP_CHAIN_ID === 1
              ? 'Ethereum Mainnet'
              : 'Rinkeby Testnet'
          }!`,
          color: 'orange',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Set loading to true or false
  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <GenContext.Provider
      value={{
        currentAccount: state.currentAccount,
        loading: state.loading,
        checkWallet,
        connectWallet,
        checkNetwork,
        setLoading,
      }}
    >
      {children}
    </GenContext.Provider>
  );
};

export default GenContext;
