import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar as MantineNavbar,
  Stack,
  Button,
  Divider,
  Anchor,
  Group,
} from '@mantine/core';
import {
  Home as HomeIcon,
  Diamond as MintIcon,
  LayoutGrid as NounsIcon,
} from 'tabler-icons-react';
import AppContext from '../context/AppContext';
import useIsDesktop from '../hooks/useIsDesktop';
import ConnectBtn from './ConnectBtn';
import Disclaimer from './Disclaimer';

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
      </Stack>
      <Divider mt='xl' mb='xs' label='2022 FloriNouns' labelPosition='center' />
      <Group position='center'>
        <Anchor href='https://www.fgcu.edu/' target='_blank'>
          FGCU
        </Anchor>

        <Disclaimer />
      </Group>
    </MantineNavbar>
  );
};

export default Navbar;
