import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header as MantineHeader, MediaQuery, Burger } from '@mantine/core';
import AppContext from '../context/AppContext';
import useIsDesktop from '../hooks/useIsDesktop';
import ConnectBtn from './ConnectBtn';
import Logo from '../assets/img/logo.png';

const Header = ({ theme }) => {
  const { navbarVisible, toggleNavbar } = useContext(AppContext);
  const isDesktop = useIsDesktop();

  return (
    <MantineHeader height={70} p='sm'>
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

        <Link to={'/'} style={{ height: '80%' }}>
          <img
            style={{ display: 'block', height: '100%' }}
            component={Link}
            src={Logo}
            alt='Logo'
          />
        </Link>

        {isDesktop && <ConnectBtn style={{ marginLeft: 'auto' }} />}
      </div>
    </MantineHeader>
  );
};

export default Header;
