/* Noun Page
 *	Functionality:
 *		Get next token to mint from contract
 *		If token doesn't exist, redirect to NotFound page
 *		Pass tokenId as prop to NounView
 *    Pass metadata to NounMenu
 * 	Other components to include:
 * 		- NounView
 *    - NounMenu
 *    - (optional) FAQ
 */
import { Anchor, Card, Grid, Image, SimpleGrid, Skeleton, Text } from '@mantine/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FAQ from '../components/FAQ';
import NounImage from '../components/NounImage';
import NounMenu from '../components/NounMenu';
import Web3Context from '../context/Web3Context';
import useContract from '../hooks/useContract';

const Mint = () => {
  const { currentAccount, loading } = useContext(Web3Context);
  const [next, setNext] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [minted, setMinted] = useState(false);
  const { supply, base, getConfig } = useContract();

  // Check if account and network type are valid
  const accountValid = useCallback(() => {
    return (
      currentAccount &&
      window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
    );
  }, [currentAccount]);

  // On mount, get config from contract
  useEffect(() => {
    if (currentAccount) getConfig();
  }, [getConfig, currentAccount]);

  const updateQuantity = (q) => {
    setQuantity(() => q);
  };

  const updateMinted = () => {
    setMinted(() => true);
  };

  // Renders other possible florinouns (4 after next token)
  const renderPossible = () => {
    if (!base || !next) return;
    const others = [];

    for (let i = next; i < next + quantity && i <= supply; i++) {
      others.push(
        <Image
          key={i}
          src={`https://storage.googleapis.com/fln-collection/${i}.png`}
        ></Image>
      );
    }

    if (next < supply) {
      return (
        <>
          <Text
            style={{ marginTop: '30px', marginBottom: '10px' }}
            color='black'
            weight={400}
            size={'xl'}
          >
            What you could get...
          </Text>
          <SimpleGrid
            style={{ height: 'auto' }}
            cols={4}
            breakpoints={[{ maxWidth: 'md', cols: 2 }]}
          >
            {others}
          </SimpleGrid>
        </>
      );
    }
  };

  return (
    <Skeleton
      style={{
        margin: 'auto',
        width: loading ? '800px' : 'auto',
        height: loading ? '400px' : 'auto',
      }}
      visible={loading}
    >
      <Card style={{ margin: 'auto', maxWidth: '800px' }} shadow='md' p='lg'>
        {next > supply && (
          <>
            <Text size='xl' weight='700' align='center'>
              All FloriNouns have been minted!
            </Text>
            <Text style={{ marginTop: '5px' }} size='xl' align='center'>
              View the collection{' '}
              <Anchor component={Link} to='/nouns/1' size='xl' weight='500'>
                here
              </Anchor>
            </Text>
            <Text style={{ marginTop: '5px' }} size='lg' align='center'>
              Follow us on{' '}
              <Anchor
                href='https://twitter.com/FloriNouns'
                target='_blank'
                size='lg'
                weight='500'
              >
                Twitter
              </Anchor>{' '}
              or{' '}
              <Anchor
                href='https://instagram.com/FloriNouns'
                target='_blank'
                size='lg'
                weight='500'
              >
                Instagram
              </Anchor>{' '}
              to find out about future drops!
            </Text>
          </>
        )}
        {next <= supply && (
          <Grid justify='center'>
            {!minted && (
              <NounImage
                tokenId={next || 0}
                base={!accountValid() || !base ? '' : base}
              />
            )}
            <NounMenu
              supply={supply}
              next={next}
              updateNext={(n) => setNext(() => n)}
              accountValid={accountValid}
              currentAccount={currentAccount}
              quantity={quantity}
              updateQuantity={updateQuantity}
              minted={minted}
              updateMinted={updateMinted}
            />
          </Grid>
        )}
        {currentAccount && !minted && renderPossible()}
        <FAQ />
      </Card>
    </Skeleton>
  );
};

export default Mint;
