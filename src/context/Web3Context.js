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
            title: 'Please connect to MetaMask.',
          });
        } else console.error(e);
      }
    };

    checkWallet();
  }, []);

  // run when current account changes
  useEffect(() => {
    // If account exists, check network
    const checkNetwork = async () => {
      try {
        if (window.ethereum.networkVersion !== process.env.REACT_APP_CHAIN_ID) {
          showNotification({
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
    };

    if (currentAccount) checkNetwork();
  }, [currentAccount]);

  // MetaMask popup to connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      showNotification({
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
      currentAccount,
      connectWallet,
      loading,
      setLoading,
    }),
    [currentAccount, connectWallet, loading, setLoading]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
