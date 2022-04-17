import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import Web3Context from '../context/Web3Context';

// style and classes passed in as props
const ConnectBtn = ({ style }) => {
  // Get context
  const { currentAccount, connectWallet, loading } = useContext(Web3Context);

  // Conditional rendering
  const renderContent = () => {
    // If user has account connected, return account info
    if (currentAccount) {
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
          Connected: {currentAccount.substring(0, 6)}...
          {currentAccount.substring(
            currentAccount.length - 4,
            currentAccount.length
          )}
        </Box>
      );
      // else return button to connect wallet
    } else {
      return (
        <Button onClick={connectWallet} fullWidth='true' disabled={loading}>
          Connect Wallet
        </Button>
      );
    }
  };

  return <div style={style}>{renderContent()}</div>;
};

ConnectBtn.propTypes = {
  style: PropTypes.object,
};

export default ConnectBtn;
