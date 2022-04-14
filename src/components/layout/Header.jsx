import React from 'react';
import {
  Header as MantineHeader,
  MediaQuery,
  Burger,
  Text,
} from '@mantine/core';
import ConnectBtn from './ConnectBtn';

const Header = ({ theme, opened, setOpened }) => {
  return (
    <MantineHeader height={70} p='md'>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan='md' styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <Text>Florinoun</Text>

        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <ConnectBtn style={{ marginLeft: 'auto' }} />
        </MediaQuery>
      </div>
    </MantineHeader>
  );
};

export default Header;
