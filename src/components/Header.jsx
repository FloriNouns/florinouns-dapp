import React, { useContext } from 'react';
import {
  Header as MantineHeader,
  MediaQuery,
  Burger,
  Text,
} from '@mantine/core';
import AppContext from '../context/AppContext';
import useIsDesktop from '../hooks/useIsDesktop';
import ConnectBtn from './ConnectBtn';

const Header = ({ theme }) => {
  const { navbarVisible, toggleNavbar } = useContext(AppContext);
  const isDesktop = useIsDesktop();

  return (
    <MantineHeader height={70} p='md'>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan='lg' styles={{ display: 'none' }}>
          <Burger
            opened={navbarVisible}
            onClick={toggleNavbar}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <Text>Florinoun</Text>

        {isDesktop && <ConnectBtn style={{ marginLeft: 'auto' }} />}
      </div>
    </MantineHeader>
  );
};

export default Header;
