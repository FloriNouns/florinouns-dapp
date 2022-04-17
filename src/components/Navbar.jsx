import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as MantineNavbar, Stack, Button } from '@mantine/core';
import {
  Home as HomeIcon,
  Diamond as MintIcon,
  LayoutGrid as NounsIcon,
} from 'tabler-icons-react';
import AppContext from '../context/AppContext';
import useIsDesktop from '../hooks/useIsDesktop';
import ConnectBtn from './ConnectBtn';

const Navbar = () => {
  const { navbarVisible, toggleNavbar } = useContext(AppContext);
  const isDesktop = useIsDesktop();

  return (
    <MantineNavbar
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
      </Stack>
    </MantineNavbar>
  );
};

export default Navbar;
