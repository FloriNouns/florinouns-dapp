// /* Nouns Page
//  * Functionality:
//  *  Pagination
//  *   (page * 16) - 15 = start index
//  *	 (page * 16) = end index
//  *  Get baseURI and supply to store in local state
//  *  For each in index, get image from images/ + '/{id}.png'
//  *  Add a link on each image to ./noun/:tokenId
//  */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Paper, Grid, Button, Box, Text, ActionIcon } from '@mantine/core';
import { ArrowBigLeft, ArrowBigRight } from 'tabler-icons-react';
import useContract from '../hooks/useContract';
import NounImage from '../components/NounImage';

const Nouns = () => {
  // Get page from path params and convert to number
  const { page } = useParams();
  // Create local state
  const [isOutside, setIsOutside] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  // Custom hook for contract
  const { supply, base, getConfig } = useContract();

  // On mount, get config from contract
  useEffect(() => {
    getConfig();
  }, [getConfig]);

  // When page or supply changes, set start and end then check bounds
  useEffect(() => {
    window.scrollTo(0, 0);
    setStart(() => Number(page) * 20 - 19);
    setEnd(() => Number(page) * 20);
  }, [page]);

  // When page or supply changes, set start and end then check bounds
  useEffect(() => {
    if (supply && (isNaN(Number(page)) || Number(page) < 1 || start > supply))
      setIsOutside(() => true);
    else setIsOutside(() => false);
  }, [start, page, supply]);

  // renders images for selected page
  const renderImages = () => {
    if (!base) return;

    // declare array to hold image components
    const images = [];

    // for each index, push image component
    for (let i = start; i <= (end < supply ? end : supply); i++) {
      images.push(<NounImage key={i} tokenId={i} base={base} />);
    }

    return images;
  };

  // renders images for selected page
  const renderOutOfBounds = () => {
    return (
      <Paper shadow='sm' p='lg'>
        <Text component='h2' color='blue' size='xl'>
          We couldn't find that page...
        </Text>
        <Button component={Link} to='/nouns/1'>
          Back to start
        </Button>
      </Paper>
    );
  };

  return (
    <>
      {isOutside && renderOutOfBounds()}

      {!isOutside && (
        <>
          <Grid justify='flex-start'>{renderImages()}</Grid>

          <Box style={{ display: 'flex' }}>
            {Number(page) !== 1 && (
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
                to={`/nouns/${Number(page) + 1}`}
                size='xl'
                style={{ margin: '10px', marginLeft: 'auto' }}
              >
                <ArrowBigRight />
              </ActionIcon>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Nouns;
