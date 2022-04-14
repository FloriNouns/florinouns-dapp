import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Text, Button } from '@mantine/core';

const NotFound = () => {
  return (
    <Paper shadow='sm' p='lg'>
      <Text
        component='p'
        variant='gradient'
        gradient={{ from: 'red', to: 'orange', deg: 45 }}
        size='xl'
      >
        We couldn't find that page :(
      </Text>
      <Button component={Link} to='/' variant='light'>
        Back to Home
      </Button>
    </Paper>
  );
};

export default NotFound;
