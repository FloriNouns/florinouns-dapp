/* NounMenu Component
 *  Content changes based on
 *		1) (!currentAccount)
 *		2) (currentAccount)
 *	Functionality:
 *		Get metadata from props
 *    Mint button, open sea link, etc.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SegmentedControl, Grid, Text, Button } from '@mantine/core';
import Web3 from 'web3';
import useContract from '../hooks/useContract';

const NounMenu = ({ updateNext, accountValid, currentAccount }) => {
  const { nextToken, getNextToken, invites, getInvites, sendMintRequest } =
    useContract();
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedInvite, setSelectedInvite] = useState(null);
  const [resultURLs, setResultURLs] = useState(null);
  const web3 = new Web3();

  // On mount, get nextToken and invites from contract
  useEffect(() => {
    if (getNextToken && getInvites && accountValid()) {
      getNextToken();
      getInvites();
    }
  }, [getNextToken, getInvites, accountValid]);

  // When next token changes, update parent
  useEffect(() => {
    if (nextToken) updateNext(Number(nextToken));
  }, [nextToken, updateNext]);

  useEffect(() => {
    if (!selectedKey) return;
    setSelectedInvite(
      () => invites.filter((invite) => invite.key === selectedKey)[0]
    );
  }, [invites, selectedKey]);

  const renderInvites = () => {
    if (invites.length === 0) return;
    const data = [];

    for (const invite of invites) {
      if (data.length === 0 && selectedKey === '')
        setSelectedKey(() => invite.key);

      if (data.filter((option) => option.value === invite.key).length === 0) {
        if (
          !(
            invite.key ===
            '0x0000000000000000000000000000000000000000000000000000000000000000'
          )
        ) {
          data.push({
            label: `Invite: ${invite.key}`,
            value: invite.key,
          });
        } else {
          data.push({
            label: 'Public Release',
            value: invite.key,
          });
        }
      }
    }

    return data.length === 0 ? (
      <></>
    ) : (
      <>
        <Text
          style={{ marginTop: '30px', marginBottom: '5px' }}
          color='black'
          size={'sm'}
        >
          Select your invite below
        </Text>
        <SegmentedControl
          value={selectedKey}
          onChange={setSelectedKey}
          data={data}
          fullWidth
          orientation='vertical'
        />
      </>
    );
  };

  const mint = async () => {
    const results = await sendMintRequest(selectedInvite);
    setResultURLs(() => results || null);
  };

  const renderContent = () => {
    if (!accountValid()) {
      if (currentAccount)
        return (
          <Text color='black' weight={400} size={'xl'}>
            Please switch your network to{' '}
            {process.env.REACT_APP_CHAIN_ID === 1 ? 'Mainnet' : 'Rinkeby'}
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
            Possible Florinoun - #{nextToken}
          </Text>
          {!resultURLs && (
            <>
              {renderInvites()}
              <Button
                onClick={() => mint(selectedInvite)}
                style={{ marginTop: '20px' }}
                size='md'
                fullWidth
                disabled={!selectedInvite}
              >
                {selectedInvite
                  ? `Mint for ${web3.utils.fromWei(
                      selectedInvite.condition.price,
                      'ether'
                    )} ETH`
                  : 'No invite to mint :('}
              </Button>
            </>
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
