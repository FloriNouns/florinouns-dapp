import { Anchor, Button, Divider, Group, Navbar as MantineNavbar, Stack } from '@mantine/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle as DisclaimerIcon, Diamond as MintIcon, LayoutGrid as NounsIcon } from 'tabler-icons-react';

import AppContext from '../context/AppContext';
import useIsDesktop from '../hooks/useIsDesktop';
import ConnectBtn from './ConnectBtn';

const Navbar = () => {
  const { navbarVisible, toggleNavbar } = useContext(AppContext);
  const isDesktop = useIsDesktop();

  return (
    <MantineNavbar
      style={{ zIndex: '402' }}
      p='md'
      hiddenBreakpoint='lg'
      hidden={!navbarVisible}
      width={{ sm: 300 }}
    >
      <Stack justify='flex-start'>
        {!isDesktop && <ConnectBtn />}
        <Button
          onClick={toggleNavbar}
          component={Link}
          to='/'
          leftIcon={<HomeIcon />}
          variant='outline'
        >
          Home
        </Button>
        <Button
          onClick={toggleNavbar}
          component={Link}
          to='/mint'
          leftIcon={<MintIcon />}
          variant='outline'
        >
          Mint
        </Button>
        <Button
          onClick={toggleNavbar}
          component={Link}
          to='/nouns/1'
          leftIcon={<NounsIcon />}
          variant='outline'
        >
          Nouns
        </Button>
        <Button
          onClick={toggleNavbar}
          component={Link}
          to='/disclaimer'
          leftIcon={<DisclaimerIcon />}
          variant='outline'
        >
          Disclaimer
        </Button>
      </Stack>
      <Divider my='xl' label='2022 FloriNouns' labelPosition='center' />
      <Group position='center'>
        <Anchor href='https://opensea.io/collection/florinouns' target='_blank'>
          OpenSea
        </Anchor>
        <Anchor
          href={`https://rarible.com/collection/${process.env.REACT_APP_CONTRACT_ADDRESS}/items`}
          target='_blank'
        >
          Rarible
        </Anchor>
        <Anchor
          href={`https://etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}
          target='_blank'
        >
          Etherscan
        </Anchor>
        <Anchor href='https://twitter.com/FloriNouns' target='_blank'>
          Twitter
        </Anchor>
        <Anchor href='https://instagram.com/FloriNouns' target='_blank'>
          Instagram
        </Anchor>
        <Anchor href='https://github.com/FloriNouns' target='_blank'>
          Github
        </Anchor>
        <Anchor href='https://www.fgcu.edu/' target='_blank'>
          FGCU
        </Anchor>
      </Group>
    </MantineNavbar>
  );
};

export default Navbar;
