/* Noun Page
 *	Functionality:
 *		Pass tokenId as prop to NounView
 * 	Other components to include:
 * 		- NounView
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NounView from '../noun/NounView';

const Noun = () => {
  // Get tokenId from path params
  let { tokenId } = useParams();
  const navigate = useNavigate();
  // If not a number, go to 404 page
  if (isNaN(Number(tokenId))) navigate('/404');
  // else convert to number
  else tokenId = Number(tokenId);

  return (
    <div>
      <NounView tokenId={tokenId} />
    </div>
  );
};

export default Noun;
