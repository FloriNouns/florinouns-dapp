/* NounView Component
 *	Functionality:
 *		Get token from contract with tokenId
 *		If token doesn't exist, redirect to NotFound page
 *		Display image
 *		Pass whatevers needed for noun menu dynamics
 * 	Other components to include:
 * 		- NounMenu
 */

import React from 'react';
import PropTypes from 'prop-types';

const NounView = ({ tokenId }) => {
  return <div>Viewing Noun {tokenId}</div>;
};

NounView.propTypes = {
  tokenId: PropTypes.number.isRequired,
};

export default NounView;
