import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { Home, Mint, Nouns, Noun, Disclaimer, NotFound } from '../pages';

const Shell = () => {
  const theme = useMantineTheme();

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
        navbarOffsetBreakpoint='lg'
        fixed
        header={<Header theme={theme} />}
        navbar={<Navbar />}
        footer={<Footer />}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mint' element={<Mint />} />
          <Route path='/nouns/:page' element={<Nouns />} />
          <Route path='/noun/:tokenId' element={<Noun />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AppShell>
    </Router>
  );
};

export default Shell;
