import React, { useState } from 'react';
import { Modal, Anchor, Text } from '@mantine/core';

const Disclaimer = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        zIndex={1000}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title='Disclaimer'
      >
        <Text>
          All Florinouns purchased through minting via this site or through a
          third party are under your own discretion. Please review laws and
          taxations surounding cryptocurrency and NFTs in your country before
          purchase.
        </Text>
      </Modal>

      <Anchor onClick={() => setOpened(true)}>Disclaimer</Anchor>
    </>
  );
};

export default Disclaimer;
