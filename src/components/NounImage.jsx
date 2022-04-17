import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Skeleton, Image, Badge, Text, Grid } from '@mantine/core';
import PropTypes from 'prop-types';

const NounImage = ({ tokenId, base }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setShow(() => true);
    }, 200);
  }, []);

  return (
    <Grid.Col span={6} md={3}>
      <Skeleton visible={!show} style={{ aspectRatio: 1, contain: 'content' }}>
        <Image
          component={Link}
          to={`/noun/${tokenId}`}
          src={
            base !== ''
              ? `${process.env.PUBLIC_URL}/images/${tokenId}.png`
              : `${process.env.PUBLIC_URL}/images/placeholder.png`
          }
        />
        {location.pathname.includes('/nouns/') && (
          <Badge
            style={{ position: 'fixed', bottom: '0' }}
            radius='xs'
            fullWidth
            variant='gradient'
            gradient={{ from: 'indigo', to: 'green', deg: 135 }}
          >
            <Text weight={400} transform='capitalize' size='sm'>
              Florinoun #{tokenId}
            </Text>
          </Badge>
        )}
      </Skeleton>
    </Grid.Col>
  );
};

NounImage.propTypes = {
  tokenId: PropTypes.number.isRequired,
  base: PropTypes.string.isRequired,
};

export default NounImage;
