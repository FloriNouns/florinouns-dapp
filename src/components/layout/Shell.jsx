import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Stack,
  Text,
  Button,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import {
  Home as HomeIcon,
  Diamond as MintIcon,
  LayoutGrid as NounsIcon,
  InfoSquare as AboutIcon,
} from 'tabler-icons-react';
import ConnectBtn from '../layout/ConnectBtn';
import Home from '../pages/Home';
import Mint from '../pages/Mint';
import Nouns from '../pages/Nouns';
import Noun from '../pages/Noun';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

const Shell = ({ currentAccount, setCurrentAccount, walletLoading }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Router>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint='md'
        fixed
        navbar={
          <Navbar
            p='md'
            hiddenBreakpoint='md'
            hidden={!opened}
            width={{ sm: 300 }}
          >
            <Stack justify='flex-start'>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <ConnectBtn
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                  walletLoading={walletLoading}
                />
              </MediaQuery>
              <Button
                component={Link}
                to='/'
                leftIcon={<HomeIcon />}
                variant='default'
              >
                Home
              </Button>
              <Button
                component={Link}
                to='/mint'
                leftIcon={<MintIcon />}
                variant='default'
              >
                Mint
              </Button>
              <Button
                component={Link}
                to='/nouns'
                leftIcon={<NounsIcon />}
                variant='default'
              >
                Nouns
              </Button>
              <Button
                component={Link}
                to='/about'
                leftIcon={<AboutIcon />}
                variant='default'
              >
                About
              </Button>
            </Stack>
          </Navbar>
        }
        footer={
          <Footer height={60} p='md'>
            Application footer
          </Footer>
        }
        header={
          <Header height={70} p='md'>
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
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
                <ConnectBtn
                  currentAccount={currentAccount}
                  setCurrentAccount={setCurrentAccount}
                  walletLoading={walletLoading}
                  style={{ marginLeft: 'auto' }}
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/nouns' element={<Nouns />} />
            <Route path='/noun/:id' element={<Noun />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </AppShell>
    </Router>
  );
};

Shell.propTypes = {
  currentAccount: PropTypes.string,
  setCurrentAccount: PropTypes.func.isRequired,
  walletLoading: PropTypes.bool.isRequired,
};

export default Shell;
