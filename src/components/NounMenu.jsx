/* NounMenu Component
 *  Content changes based on
 *		1) (!currentAccount)
 *		2) (currentAccount)
 *	Functionality:
 *		Get metadata from props
 *    Mint button, open sea link, etc.
 */
import { ActionIcon, Button, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { SquareMinus, SquarePlus } from 'tabler-icons-react';

import useContract from '../hooks/useContract';

const NounMenu = ({
  supply,
  next,
  updateNext,
  accountValid,
  currentAccount,
  quantity,
  updateQuantity,
  minted,
  updateMinted,
}) => {
  const { nextToken, getNextToken, sendMintRequest } = useContract();
  const [resultURLs, setResultURLs] = useState([]);

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
    const results = await sendMintRequest(quantity);
    setResultURLs(() => results || []);
    if (results) updateMinted();
  };

  const renderURLS = () => {
    const results = [];

    for (const token of resultURLs) {
      results.push(
        <div key={token.mintedId}>
          <Text color='black' weight={400} size={'xl'} mt={20}>
            FloriNoun #{token.mintedId}
          </Text>
          <Image
            src={`https://storage.googleapis.com/fln-collection/${token.mintedId}.png`}
          />
          <Button
            component='a'
            target='_blank'
            rel='noopener noreferrer'
            href={token.openseaURL}
            fullWidth
            my={5}
          >
            View on OpenSea
          </Button>
          <Button
            component='a'
            target='_blank'
            rel='noopener noreferrer'
            href={token.raribleURL}
            fullWidth
            my={5}
          >
            View on Rarible
          </Button>
        </div>
      );
    }

    return (
      <SimpleGrid
        cols={results.length === 1 ? 1 : 2}
        spacing='lg'
        breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}
      >
        {results}
      </SimpleGrid>
    );
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
          {resultURLs.length === 0 && (
            <>
              <Text color='black' weight={400} size={'xl'}>
                Possible FloriNoun - #{nextToken}
              </Text>
              <Text
                color='black'
                style={{ marginTop: '40px' }}
                weight={400}
                size={'lg'}
              >
                Quantity
              </Text>
              <Group position='center' spacing='sm'>
                <ActionIcon
                  size='xl'
                  onClick={() =>
                    quantity > 1 ? updateQuantity(quantity - 1) : null
                  }
                >
                  <SquareMinus />
                </ActionIcon>
                <Text color='black' weight={700} size={'lg'}>
                  {quantity}
                </Text>
                <ActionIcon
                  size='xl'
                  onClick={() =>
                    quantity < 20 && next + quantity < supply
                      ? updateQuantity(quantity + 1)
                      : null
                  }
                >
                  <SquarePlus />
                </ActionIcon>
              </Group>
              <Button
                onClick={() => mint()}
                style={{ marginTop: '30px' }}
                size='md'
                fullWidth
              >
                {/* {selectedInvite
                ? `Mint for ${web3.utils.fromWei(
                    selectedInvite.condition.price,
                    'ether'
                  )} ETH`
                : 'Mint for 0.025 ETH'} */}
                Mint for {(0.025 * quantity).toFixed(3)} ETH
              </Button>
            </>
          )}
          {resultURLs.length > 0 && (
            <>
              <Text
                style={{ marginBottom: '20px' }}
                color='green'
                weight={400}
                size={'xl'}
              >
                MINT SUCCESSFUL
              </Text>
              {renderURLS()}
            </>
          )}
        </>
      );
    }
  };

  return (
    <Grid.Col
      style={{ textAlign: 'center' }}
      span={12}
      md={minted ? 12 : 6}
      p='md'
    >
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
