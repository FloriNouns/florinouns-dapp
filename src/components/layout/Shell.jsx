import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
import GenContext from '../../context/GenContext';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import Mint from '../pages/Mint';
import Nouns from '../pages/Nouns';
import Noun from '../pages/Noun';
import Disclaimer from '../pages/Disclaimer';
import NotFound from '../pages/NotFound';

const Shell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { checkWallet, checkNetwork } = useContext(GenContext);

  useEffect(() => {
    checkWallet();

    if (window.ethereum) {
      checkNetwork();
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

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
        header={<Header theme={theme} opened={opened} setOpened={setOpened} />}
        navbar={<Navbar opened={opened} />}
        footer={<Footer />}
      >
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/nouns/:page' element={<Nouns />} />
            <Route path='/noun/:tokenId' element={<Noun />} />
            <Route path='/disclaimer' element={<Disclaimer />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </AppShell>
    </Router>
  );
};

export default Shell;
