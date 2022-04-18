import React, { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import Web3Context from '../context/Web3Context';

const Spinner = () => {
  const { loading } = useContext(Web3Context);

  return (
    <LoadingOverlay
      style={{ zIndex: '403' }}
      transitionDuration={200}
      visible={loading}
      loaderProps={{ size: 'xl' }}
      overlayColor='#000000'
      overlayOpacity={0.7}
    />
  );
};

export default Spinner;
