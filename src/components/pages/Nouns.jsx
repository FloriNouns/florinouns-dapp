/* Nouns Page
 * Functionality:
 *  Pagination
 *   (page * 16) - 15 = start index
 *	 (page * 16) = end index
 *  Get baseURI and supply to store in local state
 *  For each in index, get image from images/ + '/{id}.png'
 *  Add a link on each image to ./noun/:tokenId
 */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Paper,
  SimpleGrid,
  Overlay,
  Image,
  Badge,
  Box,
  Text,
  ActionIcon,
  Skeleton,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ArrowBigLeft, ArrowBigRight } from 'tabler-icons-react';
import Web3 from 'web3';
import GenContext from '../../context/GenContext';
import F0 from '../../abi/F0.json';

const Nouns = () => {
  // Get currentAccount state and setLoading from context
  const { currentAccount, setLoading } = useContext(GenContext);
  // Create local state
  const [supply, setSupply] = useState(null);
  const [base, setBase] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [rendering, setRendering] = useState(true);
  // Object for redirects
  const navigate = useNavigate();
  // Get page from path params and convert to number
  let { page } = useParams();
  page = Number(page);

  useEffect(() => {
    setRendering(true);
    setTimeout(() => {
      setRendering(false);
    }, [200]);
  }, [page]);

  // Set start and end indices, redirect if out of bounds
  useEffect(() => {
    window.scrollTo(0, 0);
    setStart(page * 20 - 19);
    setEnd(page * 20 <= supply ? page * 20 : supply);
    if (isNaN(page) || page < 1 || (supply && start > supply)) navigate('/404');
  }, [start, page, supply, navigate]);

  // Get supply and base from contract
  useEffect(() => {
    // declare provider
    let provider;

    // User is connect and on correct chain, set MetaMask as provider
    if (
      currentAccount &&
      window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
    ) {
      provider = window.ethereum;
    } else {
      // else if on mainnet, use mainnet infura provider
      if (process.env.REACT_APP_CHAIN_ID === 1)
        provider = process.env.REACT_APP_MAINNET_JSONRPC;
      // else use rinkeby infura provider
      else provider = process.env.REACT_APP_RINKEBY_JSONRPC;
    }

    // connect to contract using abi and contract address
    const web3 = new Web3(provider);
    const collection = new web3.eth.Contract(
      F0,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );

    // gets config from contract (check factoria dev docs)
    const getConfig = async () => {
      setLoading(true);
      try {
        // get config from contract
        const config = await collection.methods.config().call();
        // set supply and base from config
        setSupply(config.supply);
        setBase(config.base);
      } catch (e) {
        setLoading(false);
        // if there's an error, alert user and redirect
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

    if (!supply) {
      getConfig();
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  // renders images for selected page
  const renderImages = () => {
    // declare array to hold image components
    const images = [];

    // for each index, push image component
    for (let i = start; i <= end; i++) {
      images.push(
        <Skeleton key={i} visible={rendering}>
          <Box sx={{ position: 'relative' }}>
            <Overlay
              zIndex={2}
              component={Link}
              to={`/noun/${i}`}
              opacity={0}
              color='#000'
              sx={{
                '&:hover': {
                  opacity: '0.4',
                },
              }}
            />
            <Image
              key={'Image' + i}
              src={
                // if base is '', files aren't revealed so use placeholder
                // else try to use image, if it doesn't exist use placeholder
                base === ''
                  ? `${process.env.PUBLIC_URL}/images/placeholder.png`
                  : `${process.env.PUBLIC_URL}/images/${i}.png` ||
                    `${process.env.PUBLIC_URL}/images/placeholder.png`
              }
            />
          </Box>
          <Badge
            radius='xs'
            fullWidth
            variant='gradient'
            gradient={{ from: 'indigo', to: 'green', deg: 135 }}
          >
            <Text weight={400} transform='capitalize' size='sm'>
              Florinoun #{i}
            </Text>
          </Badge>
        </Skeleton>
      );
    }

    return images;
  };

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      })}
    >
      <SimpleGrid
        cols={4}
        spacing='xs'
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
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
