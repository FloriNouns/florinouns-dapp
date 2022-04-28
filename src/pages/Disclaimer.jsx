import React from 'react';
import { Paper, Divider, Text } from '@mantine/core';

const Disclaimer = () => {
  return (
    <Paper style={{ margin: 'auto', maxWidth: '800px' }} shadow='md' p='md'>
      <Text size='xl' weight='800' align='center' color='blue'>
        FLORINOUNS DISCLAIMER PAGE
      </Text>
      <Divider size='md' m='sm' />
      <Text size='lg'>
        All FloriNouns purchased through minting via this site or through a
        third party are under your own discretion. Please review laws and
        taxations surounding cryptocurrency and NFTs in your country before
        purchase. We are not liable for any legalities that comes from using our
        website.
      </Text>
    </Paper>
  );
};

export default Disclaimer;
