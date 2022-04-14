import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@mantine/core';
import GenContext from '../../context/GenContext';

const ConnectBtn = ({ style, className }) => {
  const { currentAccount, loading, connectWallet } = useContext(GenContext);

  const renderContent = () => {
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
