/* NounMenu Component
 *  Content changes based on
 *		1) (!currentAccount)
 *		2) (currentAccount)
 *	Functionality:
 *		Get metadata from props
 *    Mint button, open sea link, etc.
 */
import { Button, Grid, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useContract from '../hooks/useContract';

const NounMenu = ({ updateNext, accountValid, currentAccount }) => {
  const { nextToken, getNextToken, sendMintRequest } = useContract();
  const [resultURLs, setResultURLs] = useState(null);

  // On mount, get nextToken and invites from contract
  useEffect(() => {
    if (getNextToken && accountValid()) {
      getNextToken();
    }
  }, [getNextToken, accountValid]);

  // When next token changes, update parent
  useEffect(() => {
    if (nextToken) updateNext(Number(nextToken));
  }, [nextToken, updateNext]);

  // useEffect(() => {
  //   if (!invites[0]) return;

  //   if (!selectedInvite) {
  //     setSelectedInvite(() => invites[0]);
  //   }

  //   let lowestPrice = invites[0].condition.price;
  //   for (const invite of invites) {
  //     if (invite.condition.price < lowestPrice) {
  //       setSelectedInvite(() => invite);
  //       lowestPrice = invite.condition.price;
  //     }
  //   }
  // }, [invites, selectedInvite]);

  const mint = async () => {
    const results = await sendMintRequest();
    setResultURLs(() => results || null);
  };

  const renderContent = () => {
    if (!accountValid()) {
      if (currentAccount)
        return (
          <Text color='black' weight={400} size={'xl'}>
            Please switch your network to{' '}
            {process.env.REACT_APP_CHAIN_ID === '1' ? 'Mainnet' : 'Rinkeby'}
          </Text>
        );
      else {
        return (
          <Text color='black' weight={400} size={'xl'}>
            Connect your account via MetaMask to see more details.
          </Text>
        );
      }
    } else {
      return (
        <>
          <Text color='black' weight={400} size={'xl'}>
            Possible FloriNoun - #{nextToken}
          </Text>
          {!resultURLs && (
            <Button
              onClick={() => mint()}
              style={{ marginTop: '20px' }}
              size='md'
              fullWidth
            >
              {/* {selectedInvite
                ? `Mint for ${web3.utils.fromWei(
                    selectedInvite.condition.price,
                    'ether'
                  )} ETH`
                : 'Mint for 0.025 ETH'} */}
              Mint for 0.025 ETH
            </Button>
          )}
          {resultURLs && resultURLs.length > 0 && (
            <>
              <Text
                style={{ marginTop: '20px' }}
                color='green'
                weight={400}
                size={'xl'}
              >
                MINT SUCCESSFUL
              </Text>
              <Button
                style={{ marginTop: '20px' }}
                component='a'
                target='_blank'
                rel='noopener noreferrer'
                href={resultURLs[0]}
                fullWidth
              >
                View on OpenSea
              </Button>
              <Button
                style={{ marginTop: '20px' }}
                component='a'
                target='_blank'
                rel='noopener noreferrer'
                href={resultURLs[1]}
                fullWidth
              >
                View on Rarible
              </Button>
              <Button
                style={{ marginTop: '20px' }}
                onClick={() => window.location.reload()}
                fullWidth
              >
                Mint Another
              </Button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <Grid.Col style={{ textAlign: 'center' }} span={12} md={6} p='md'>
      {renderContent()}
    </Grid.Col>
  );
};

NounMenu.propTypes = {
  updateNext: PropTypes.func,
  accountValid: PropTypes.func,
  currentAccount: PropTypes.string,
};

export default NounMenu;
