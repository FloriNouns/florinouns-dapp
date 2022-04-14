import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar as MantineNavbar,
  Stack,
  MediaQuery,
  Button,
} from '@mantine/core';
import {
  Home as HomeIcon,
  Diamond as MintIcon,
  LayoutGrid as NounsIcon,
} from 'tabler-icons-react';
import ConnectBtn from './ConnectBtn';

const Navbar = ({ opened }) => {
  return (
    <MantineNavbar
      p='md'
      hiddenBreakpoint='md'
      hidden={!opened}
      width={{ sm: 300 }}
    >
      <Stack justify='flex-start'>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <ConnectBtn />
        </MediaQuery>
        <Button
          component={Link}
          to='/'
          leftIcon={<HomeIcon />}
          variant='outline'
        >
          Home
        </Button>
        <Button
          component={Link}
          to='/mint'
          leftIcon={<MintIcon />}
          variant='outline'
        >
          Mint
        </Button>
        <Button
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
