import React, { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import GenContext from '../../context/GenContext';

const Spinner = () => {
  const { loading } = useContext(GenContext);

  return <LoadingOverlay visible={loading} />;
};

export default Spinner;
