import React, { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import GenContext from '../../context/GenContext';

const Spinner = () => {
  const { loading } = useContext(GenContext);

  return (
    <LoadingOverlay
      transitionDuration={200}
      visible={loading}
      loaderProps={{ size: 'xl' }}
      overlayColor='#000000'
      overlayOpacity={0.7}
    />
  );
};

export default Spinner;
