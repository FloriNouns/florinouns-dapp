import React from 'react';
import { Button } from '@mantine/core';

const ConnectBtn = (props) => {
  return (
    <div style={props.style} className={props.className}>
      <Button fullWidth='true'>Connect Wallet</Button>
    </div>
  );
};

export default ConnectBtn;
