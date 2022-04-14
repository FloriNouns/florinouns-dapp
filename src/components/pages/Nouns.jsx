/* Nouns Page
 * Functionality:
 *  Pagination
 *   (page * 20) - 19 = start index
 *	 (page * 20) = end index
 *  Get baseURI and store in local state
 *  For each in index, get image from baseURI + '/{id}.jpg'
 *  Add a link on each image to ./noun/:tokenId
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Nouns = () => {
  // Get page from path params
  let { page } = useParams();
  const navigate = useNavigate();
  // If not a number, go to 404 page
  if (isNaN(Number(page))) navigate('/404');
  // else convert to number
  else page = Number(page);

  return <div>Viewing Nouns Page</div>;
};

export default Nouns;
