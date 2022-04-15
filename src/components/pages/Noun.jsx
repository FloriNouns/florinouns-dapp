/* Noun Page
 *	Functionality:
 *		Pass tokenId as prop to NounView
 * 	Other components to include:
 * 		- NounView
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NounView from '../noun/NounView';

const Noun = () => {
  // Object for redirects
  const navigate = useNavigate();
  // Get tokenId from path params and convert to number
  let { tokenId } = useParams();
  tokenId = Number(tokenId);

  // on tokenId change, redirect if out of bounds
  useEffect(() => {
    // TODO add condition if tokenId > supply
    if (isNaN(tokenId) || tokenId < 1) navigate('/404');
  }, [tokenId, navigate]);

  return (
    <div>
      <NounView tokenId={tokenId} />
    </div>
  );
};

export default Noun;
