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

import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Card,
  Grid,
  Text,
  Skeleton,
  SimpleGrid,
  Image,
  Anchor,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import Web3Context from '../context/Web3Context';
import useContract from '../hooks/useContract';
import NounImage from '../components/NounImage';
import NounMenu from '../components/NounMenu';
import FAQ from '../components/FAQ';

const Mint = () => {
  const { currentAccount, loading } = useContext(Web3Context);
  const [next, setNext] = useState(null);
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

  // Renders other possible florinouns (4 after next token)
  const renderPossible = () => {
    if (!base || !next) return;
    const others = [];

    for (let i = next + 1; i <= next + 4 && i <= supply; i++) {
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
            Other Possible FloriNouns
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
          </>
        )}
        {next <= supply && (
          <Grid justify='center'>
            <NounImage
              tokenId={next || 0}
              base={!accountValid() || !base ? '' : base}
            />
            <NounMenu
              updateNext={(n) => setNext(() => n)}
              accountValid={accountValid}
              currentAccount={currentAccount}
            />
          </Grid>
        )}
        {currentAccount && renderPossible()}
        <FAQ />
      </Card>
    </Skeleton>
  );
};

export default Mint;
