import React from 'react';
import { useParams } from 'react-router-dom';

const Noun = () => {
  const { id } = useParams();

  return <div>Viewing Florinoun {id}</div>;
};

export default Noun;
