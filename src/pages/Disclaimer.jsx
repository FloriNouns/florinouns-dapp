import { Divider, Paper, Text } from '@mantine/core';
import React from 'react';

const Disclaimer = () => {
  return (
    <Paper style={{ margin: 'auto', maxWidth: '800px' }} shadow='md' p='md'>
      <Text size='xl' weight='800' align='center' color='blue'>
        FLORINOUNS DISCLAIMER PAGE
      </Text>
      <Divider size='md' m='sm' />
      <Text size='lg'>
        The decision to mint or purchase FloriNouns via this site or through a
        third party is under your own discretion. Please review laws and
        taxations surounding cryptocurrency and NFTs in your country before
        purchasing. FloriNouns and the Dunk City DAO are not liable for any
        legal or financial issues that result from participating.
      </Text>
    </Paper>
  );
};

export default Disclaimer;
