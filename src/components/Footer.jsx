import React from 'react';
import { Link } from 'react-router-dom';
import { Footer as MantineFooter, Anchor, Group, Text } from '@mantine/core';

const Footer = () => {
  return (
    <MantineFooter height={50} p='sm'>
      <Group position='left'>
        <Text>2022 Florinoun</Text>

        <Anchor href='https://www.fgcu.edu/' target='_blank'>
          Affiliated with FGCU
        </Anchor>

        <Text color='indigo' component={Link} to='/disclaimer'>
          Disclaimer
        </Text>
      </Group>
    </MantineFooter>
  );
};

export default Footer;
