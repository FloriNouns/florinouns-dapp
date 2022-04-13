import React, { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import {
  NotificationsProvider,
  showNotification,
} from '@mantine/notifications';
import Shell from './components/layout/Shell';

/* Waiting for contract integration
import Web3 from 'web3';
import { CONTRACT_ADDRESS, transformMetadata } from './constants';
import F0 from './abi/F0.json';
 */

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [walletLoading, setWalletLoading] = useState(false);

  /* Waiting for contract integration
  const [collection, setCollection] = useState(null);

  const web3 = new Web3(window.ethereum);
  setCollection(new web3.eth.Contract(F0.abi, CONTRACT_ADDRESS));
	 */

  // check for connected wallet and set current account
  useEffect(() => {
    setWalletLoading(true);

    const checkWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length !== 0) {
            const account = accounts[0];
            setCurrentAccount(account);
          }
        } catch (e) {
          if (e.code === 4001) {
            showNotification({
              title: 'Please connect to MetaMask.',
            });
          } else console.error(e);
        }
      }

      setWalletLoading(false);
    };

    checkWallet();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (currentAccount !== null) checkNetwork();
  }, [currentAccount]);

  // If in prod check for mainnet, otherwise check for rinkeby
  const checkNetwork = async () => {
    try {
      if (
        (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') &&
        window.ethereum.networkVersion !== '4'
      ) {
        showNotification({
          title: "Make sure you're on Rinkeby Testnet!",
          color: 'orange',
        });
      } else if (
        process.env.NODE_ENV === 'production' &&
        window.ethereum.networkVersion !== '1'
      ) {
        showNotification({
          title: "Make sure you're on Ethereum Mainnet!",
          color: 'orange',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MantineProvider>
      <button>Print Current Account</button>
      <NotificationsProvider>
        <Shell
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
          walletLoading={walletLoading}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
