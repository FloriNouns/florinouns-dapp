import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell, LoadingOverlay, useMantineTheme } from '@mantine/core';
import Header from './Header';
import Navbar from './Navbar';

const Shell = () => {
  // const Home = lazy(() => import('../pages/Home'));
  const Mint = lazy(() => import('../pages/Mint'));
  const Nouns = lazy(() => import('../pages/Nouns'));
  // const Noun = lazy(() => import('../pages/Noun'));
  const NotFound = lazy(() => import('../pages/NotFound'));
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
      >
        <Suspense
          fallback={
            <LoadingOverlay
              visible
              zIndex={999}
              transitionDuration={200}
              loaderProps={{ size: 'xl' }}
              overlayColor='#000000'
              overlayOpacity={0.7}
            />
          }
        >
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            {/* <Route path='/mint' element={<Mint />} /> */}
            <Route path='/' element={<Mint />} />
            <Route path='/nouns/:page' element={<Nouns />} />
            {/* <Route path='/noun/:tokenId' element={<Noun />} /> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </Router>
  );
};

export default Shell;
