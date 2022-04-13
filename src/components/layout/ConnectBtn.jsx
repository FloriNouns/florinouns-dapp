import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const ConnectBtn = ({
  currentAccount,
  setCurrentAccount,
  walletLoading,
  style,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ethereum } = window;

  // MetaMask popup to connect wallet
  const connectWallet = async () => {
    setIsLoading(true);

    if (!ethereum) {
      showNotification({
        title: 'You need MetaMask to connect your wallet.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      setCurrentAccount(account);
    } catch (e) {
      if (e.code === 4001) {
        showNotification({
          title: 'Please connect to MetaMask.',
        });
      } else console.error(e);
    }

    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading || walletLoading) {
      return (
        <Button fullWidth='true' loading>
          Connect Wallet
        </Button>
      );
    } else if (currentAccount) {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.green[2],
            color: theme.colors.gray[9],
            textAlign: 'center',
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
          })}
        >
          Connected: {currentAccount}
        </Box>
      );
    } else {
      return (
        <Button onClick={connectWallet} fullWidth='true'>
          Connect Wallet
        </Button>
      );
    }
  };

  return (
    <div style={style} className={className}>
      {renderContent()}
    </div>
  );
};

ConnectBtn.propTypes = {
  currentAccount: PropTypes.string,
  setCurrentAccount: PropTypes.func.isRequired,
  walletLoading: PropTypes.bool.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ConnectBtn;
