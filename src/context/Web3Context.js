import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { showNotification } from '@mantine/notifications';

const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  // run when app mounts
  useEffect(() => {
    // check for connected wallet and set current account
    const checkWallet = async () => {
      if (!window.ethereum) return;

      // Set window.ethereum events
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(() => account);
        }
      } catch (e) {
        if (e.code === 4001) {
          showNotification({
            id: 'connect-to-metamask',
            title: 'Please connect to MetaMask.',
          });
        } else console.error(e);
      }
    };

    checkWallet();
  }, []);

  // check network matches contract chain id
  const checkNetwork = useCallback(async () => {
    try {
      if (window.ethereum.networkVersion !== process.env.REACT_APP_CHAIN_ID) {
        showNotification({
          id: 'check-network',
          title: `Make sure you're on ${
            process.env.REACT_APP_CHAIN_ID === '1'
              ? 'Ethereum Mainnet'
              : 'Rinkeby Testnet'
          }!`,
          color: 'orange',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // run when current account changes
  useEffect(() => {
    if (currentAccount) checkNetwork();
  }, [currentAccount, checkNetwork]);

  // MetaMask popup to connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      showNotification({
        id: 'install-metamask',
        title: 'You need MetaMask to connect your wallet.',
      });
      return;
    }

    setLoading(() => true);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const account = accounts[0];

      setCurrentAccount(() => account);
    } catch (e) {
      if (e.code === 4001) {
        showNotification({
          id: 'connect-to-metamask',
          title: 'Please connect to MetaMask.',
        });
      } else {
        console.error(e);
      }
    }

    setLoading(() => false);
  }, []);

  const value = useMemo(
    () => ({
      checkNetwork,
      currentAccount,
      connectWallet,
      loading,
      setLoading,
    }),
    [checkNetwork, currentAccount, connectWallet, loading, setLoading]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
