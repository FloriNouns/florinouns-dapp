import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Skeleton,
  Image,
  LoadingOverlay as Caption,
  Text,
  Grid,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import PropTypes from 'prop-types';
import useIsDesktop from '../hooks/useIsDesktop';

const NounImage = ({ tokenId, base }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const location = useLocation();
  const { hovered, ref } = useHover();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(() => false);
    }, 200);
  }, []);

  return (
    <Grid.Col span={6} md={3}>
      <Skeleton
        ref={ref}
        visible={showSkeleton}
        style={{ aspectRatio: 1, contain: 'content' }}
      >
        <Link to={`/noun/${tokenId}`}>
          {location.pathname.includes('/nouns/') && (
            <>
              {!isDesktop && (
                <Caption
                  style={{ height: '15%', marginTop: 'auto' }}
                  loader={
                    <Text color='white' weight={400} size={'lg'}>
                      Florinoun #{tokenId}
                    </Text>
                  }
                  overlayOpacity={0.7}
                  overlayColor='#000'
                  visible={true}
                />
              )}
              {isDesktop && (
                <Caption
                  loader={
                    <Text color='white' weight={400} size={'xl'}>
                      Florinoun #{tokenId}
                    </Text>
                  }
                  overlayOpacity={0.7}
                  overlayColor='#000'
                  visible={hovered}
                />
              )}
            </>
          )}
          <Image
            src={
              base !== ''
                ? `${process.env.PUBLIC_URL}/images/${tokenId}.png`
                : `${process.env.PUBLIC_URL}/images/placeholder.png`
            }
          />
        </Link>
      </Skeleton>
    </Grid.Col>
  );
};

NounImage.propTypes = {
  tokenId: PropTypes.number.isRequired,
  base: PropTypes.string.isRequired,
};

export default NounImage;
