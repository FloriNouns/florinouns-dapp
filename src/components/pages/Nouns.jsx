/* Nouns Page
 * Functionality:
 *  Pagination
 *   (page * 20) - 19 = start index
 *	 (page * 20) = end index
 *  Get baseURI and store in local state
 *  For each in index, get image from baseURI + '/{id}.jpg'
 *  Add a link on each image to ./noun/:tokenId
 */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Paper, SimpleGrid, Image, Box, ActionIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ArrowBigLeft, ArrowBigRight } from 'tabler-icons-react';
import Web3 from 'web3';
import GenContext from '../../context/GenContext';
import F0 from '../../abi/F0.json';

const Nouns = () => {
  const { currentAccount, setLoading } = useContext(GenContext);
  const [supply, setSupply] = useState(0);
  const [base, setBase] = useState(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(16);
  const navigate = useNavigate();
  let { page } = useParams();
  if (isNaN(Number(page))) navigate('/404');
  else page = Number(page);

  useEffect(() => {
    setStart(page * 20 - 19);
    setEnd(page * 20 <= supply ? page * 20 : supply);
  }, [page, supply]);

  useEffect(() => {
    let provider;
    if (
      currentAccount &&
      window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
    ) {
      provider = window.ethereum;
    } else {
      if (process.env.REACT_APP_CHAIN_ID === 1)
        provider = process.env.REACT_APP_MAINNET_JSONRPC;
      else provider = process.env.REACT_APP_RINKEBY_JSONRPC;
    }

    const web3 = new Web3(provider);
    const collection = new web3.eth.Contract(
      F0,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );

    const getConfig = async () => {
      setLoading(true);

      try {
        const config = await collection.methods.config().call();
        setSupply(config.supply);
        setBase(config.base);
      } catch (e) {
        console.error(e);
        showNotification({
          title: 'Something went wrong...',
          message:
            "We couldn't connect to the contract :( redirecting to homepage...",
          color: 'red',
        });
        navigate('/');
      }

      setLoading(false);
    };

    getConfig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderImages = () => {
    const images = [];

    for (let i = start; i <= end; i++) {
      images.push(
        <Image
          component={Link}
          to={`/noun/${i}`}
          key={i}
          src={
            base === ''
              ? `${process.env.PUBLIC_URL}/images/placeholder.png`
              : `${process.env.PUBLIC_URL}/images/${i}.png`
          }
        />
      );
    }

    return images;
  };

  return (
    <Paper>
      <SimpleGrid
        cols={4}
        spacing='xs'
        breakpoints={[
          { maxWidth: 'xs', cols: 1 },
          { minWidth: 'xs', cols: 2 },
          { minWidth: 'md', cols: 4 },
          { minWidth: 2000, cols: 5 },
        ]}
      >
        {renderImages()}
      </SimpleGrid>

      <Box style={{ display: 'flex' }}>
        {page !== 1 && (
          <ActionIcon
            component={Link}
            to={`/nouns/${page - 1}`}
            size='xl'
            style={{ margin: '10px' }}
          >
            <ArrowBigLeft />
          </ActionIcon>
        )}

        {end + 1 <= supply && (
          <ActionIcon
            component={Link}
            to={`/nouns/${page + 1}`}
            size='xl'
            style={{ margin: '10px', marginLeft: 'auto' }}
          >
            <ArrowBigRight />
          </ActionIcon>
        )}
      </Box>
    </Paper>
  );
};

export default Nouns;
