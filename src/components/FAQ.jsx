import React from 'react';
import { Accordion, Text, Divider } from '@mantine/core';

const FAQ = () => {
  return (
    <>
      <Divider my='xl' />
      <Text weight={500} align='center' size='xl'>
        FAQ
      </Text>
      <Accordion iconSize={28}>
        <Accordion.Item label='What are invites?'>
          Invites change how you mint. Some will allow you to mint at an earlier
          date or a cheaper price.
        </Accordion.Item>

        <Accordion.Item label='How does the minting work?'>
          When you mint an Florinoun, you'll get the next currently available
          one. This means if someone mints the current one before you, you'll
          get the one after that! The "Other Possible Florinouns" row gives you
          an idea of what you might get.
        </Accordion.Item>

        <Accordion.Item label="Why don't I have any invites?">
          There's multiple phases of availability for the collection. If you
          don't have an invite now, you may after a certain date when another
          phase begins. The public release begins on May 5th, 2022.
        </Accordion.Item>

        <Accordion.Item label='Where are the images stored?'>
          The images are stored using IPFS. After minting a Florinoun, you'll be
          shown links to either OpenSea or Rarible where you can view the NFT.
        </Accordion.Item>

        <Accordion.Item label='Where does the money go?'>
          All withdrawals are split between the creators/developers of the
          collection and a DAO which supports FGCU.
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FAQ;
