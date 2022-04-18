/* Noun Page
 *	Functionality:
 *		Get token from path params
 *    Check contract for token existence
 *		If token doesn't exist, redirect to NotFound page
 *		Pass tokenId as prop to NounImage
 *    Pass metadata to NounMenu
 * 	Other components to include:
 * 		- NounImage
 *    - NounMenu
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      Viewing Noun {tokenId}
      {/* <NounImage tokenId={tokenId} base={base}/> */}
      {/* <NounMenu/> */}
    </div>
  );
};

export default Noun;
