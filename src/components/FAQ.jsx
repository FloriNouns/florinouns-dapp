import { Accordion, Divider, Text } from '@mantine/core';
import React from 'react';

const FAQ = () => {
  return (
    <>
      <Divider my='xl' />
      <Text weight={500} align='center' size='xl'>
        FAQ
      </Text>
      <Accordion iconSize={28}>
        <Accordion.Item label='How does the minting work?'>
          When you mint a FloriNoun, you'll get the next currently available
          token. This means if someone mints the current token before you,
          you'll get the one after that!
        </Accordion.Item>

        <Accordion.Item label='How many FloriNouns can I mint?'>
          You can mint up to 20 FloriNouns in one transaction. The "What you
          could get" section lets you know what FloriNouns you may get depending
          on how many you're minting at once.
        </Accordion.Item>

        <Accordion.Item label="Why can't I mint?">
          There's multiple phases of availability for the collection. If you
          don't have an invite now, you may after a certain date when another
          phase begins. The public release begins on May 12th, 2022.
        </Accordion.Item>

        <Accordion.Item label='Where are the images stored?'>
          The images are stored using IPFS. After minting a FloriNoun, you'll be
          shown links to both OpenSea and Rarible where you can view your new
          NFT.
        </Accordion.Item>

        <Accordion.Item label='Where does the money go?'>
          All withdrawals are split between the creators/developers of the
          collection and the Dunk City DAO.
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FAQ;
