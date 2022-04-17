/* Home Page
 *	Content changes based on
 *		1) (!currentAccount)
 *		2) (currentAccount)
 * 	Content to include
 * 		- About the project
 * 		- Whitelist Date
 * 		- Prerelease Date
 * 	Other components to include:
 * 		- FAQ at the bottom
 *
 * Using currentAccount and connectWallet...
 *   import React, { useContext } from 'react';
 *   import GenContext from '../../context/GenContext';
 *   const { currentAccount, connectWallet } = useContext(GenContext);
 *
 *   Examples
 *     if (currentAccount)
 *     {!currentAccount && (<element/>)}
 *     <Button onClick={connectWallet}>Connect Wallet</Button>
 */

import React from 'react';

const Home = () => {
  return <div>Viewing Home Page</div>;
};

export default Home;
