import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import GenContext from '../../context/GenContext';

// style and classes passed in as props
const ConnectBtn = ({ style, className }) => {
  // Get context
  const { currentAccount, loading, connectWallet } = useContext(GenContext);

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
          Connected: {currentAccount}
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

  return (
    <div style={style} className={className}>
      {renderContent()}
    </div>
  );
};

ConnectBtn.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ConnectBtn;
