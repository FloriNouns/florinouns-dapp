import { showNotification } from '@mantine/notifications';
import { useCallback, useContext, useMemo, useState } from 'react';
import Web3 from 'web3';

import F0 from '../abi/F0.json';
import Web3Context from '../context/Web3Context';

const useContract = () => {
  const { currentAccount, setLoading } = useContext(Web3Context);
  const [supply, setSupply] = useState(null);
  const [base, setBase] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  // const [invites, setInvites] = useState([]);
  // const [checkedInvites, setCheckedInvites] = useState(false);

  // gets config from contract (check factoria dev docs)
  const getProvider = useCallback(() => {
    // Declare provider
    let provider;

    // If user is on correct chain, use MetaMask as provider
    if (
      window.ethereum &&
      window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
    ) {
      provider = window.ethereum;
    } else {
      // else if contract on mainnet, use infura mainnet
      if (process.env.REACT_APP_CHAIN_ID === '1') {
        provider = process.env.REACT_APP_MAINNET_JSONRPC;
      }
      // else use infura rinkeby
      else {
        provider = process.env.REACT_APP_RINKEBY_JSONRPC;
      }
    }

    return provider;
  }, []);

  // gets config from contract (check factoria dev docs)
  const getConfig = useCallback(async () => {
    if (!getProvider) return;
    let provider = getProvider();
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(
      F0,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );

    setLoading(true);

    try {
      // get config from contract
      const config = await contract.methods.config().call();
      // set supply and base from config
      setSupply(() => config.supply);
      setBase(() => {
        if (config.base === '') {
          showNotification({
            id: 'placeholder-notification',
            title: 'The art will be revealed soon!',
          });
        }
        return config.base;
      });
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        id: 'connection-failed',
        title: 'Something went wrong...',
        message: 'Please try refreshing the page',
        color: 'red',
      });
    }

    setLoading(false);
  }, [getProvider, setLoading]);

  // gets next token from contract (factoria docs token>nextId)
  const getNextToken = useCallback(async () => {
    if (!currentAccount) return;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      F0,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );

    setLoading(true);

    try {
      let nextTokenId = await contract.methods.nextId().call();
      setNextToken(() => nextTokenId);
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        id: 'connection-failed',
        title: 'Something went wrong...',
        message: 'Please try refreshing the page',
        color: 'red',
      });
    }

    setLoading(false);
  }, [currentAccount, setLoading]);

  // gets invites from contract (minting with private invite)
  // const getInvites = useCallback(async () => {
  //   // if there's no contract or invites already checked, return
  //   if (checkedInvites || !nextToken || !currentAccount) return;
  //   const web3 = new Web3(window.ethereum);
  //   const contract = new web3.eth.Contract(
  //     F0,
  //     process.env.REACT_APP_CONTRACT_ADDRESS
  //   );

  //   setLoading(true);

  //   try {
  //     // get invite lists
  //     let logs = await contract.getPastEvents('Invited', {
  //       fromBlock: 0,
  //       toBlock: 'latest',
  //     });

  //     setCheckedInvites(() => true);

  //     // declare array of invites
  //     let invites = [];
  //     let checkedKeys = [];

  //     // for each list
  //     for (let log of logs) {
  //       // set key and digested IPFS cid
  //       let invite = {
  //         key: log.returnValues.key,
  //         cid: ipfsh.dtoc(log.returnValues.cid),
  //         condition: await contract.methods.invite(log.returnValues.key).call(),
  //       };

  //       console.log(invite);

  //       // if key is 0x00... (public release list)
  //       if (
  //         invite.key ===
  //         '0x0000000000000000000000000000000000000000000000000000000000000000'
  //       ) {
  //         invite.addresses = [];
  //         invite.list = null;
  //         invite.proof = [];
  //         invite.invited = true;
  //       } else {
  //         let res = await fetch(
  //           'https://cloudflare-ipfs.com/ipfs/' + invite.cid
  //         ).then((r) => {
  //           return r.json();
  //         });
  //         invite.addresses = res.addresses;
  //         invite.list = new Invitelist(res.addresses);
  //         invite.proof = invite.list.proof(currentAccount);
  //         invite.invited = invite.list.verify(currentAccount, invite.proof);
  //       }

  //       try {
  //         if (
  //           !checkedKeys.includes(invite.key) &&
  //           invite.invited &&
  //           invite.condition.start < Date.now()
  //         ) {
  //           if (
  //             invite.key ===
  //             '0x0000000000000000000000000000000000000000000000000000000000000000'
  //           ) {
  //             invites.push(invite);
  //           } else {
  //             await contract.methods
  //               .mint(
  //                 {
  //                   key: invite.key,
  //                   proof: invite.proof,
  //                 },
  //                 1
  //               )
  //               .estimateGas({
  //                 from: currentAccount,
  //                 value: '' + invite.condition.price,
  //               });
  //             invites.push(invite);
  //           }
  //         }
  //       } catch (e) {
  //         console.log(`Conditions not met for invite ${invite.key}`);
  //       }

  //       if (!checkedKeys.includes(invite.key)) {
  //         checkedKeys.push(invite.key);
  //       }
  //     }

  //     // set invites in state
  //     setInvites(() => invites);
  //   } catch (e) {
  //     // if there's an error, alert user
  //     console.error(e);
  //     showNotification({
  //       id: 'connection-failed',
  //       title: 'Something went wrong...',
  //       message: 'Please try refreshing the page',
  //       color: 'red',
  //     });
  //   }

  //   setLoading(false);
  // }, [nextToken, checkedInvites, currentAccount, setLoading]);

  // mint next token (factoria dev docs - minting with private invite)
  const sendMintRequest = useCallback(
    async (quantity) => {
      if (!nextToken || !currentAccount) {
        showNotification({
          id: 'connection-failed',
          title: 'Something went wrong...',
          message: 'Please try refreshing the page',
          color: 'red',
        });
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        F0,
        process.env.REACT_APP_CONTRACT_ADDRESS
      );

      setLoading(true);

      try {
        let auth = {
          key: '0x0000000000000000000000000000000000000000000000000000000000000000',
          proof: [],
        };

        try {
          await contract.methods.mint(auth, quantity).estimateGas({
            from: currentAccount,
            value: Web3.utils.toWei((quantity * 0.025).toFixed(3), 'ether'),
          });
        } catch (e) {
          setLoading(false);
          console.log(e);
          showNotification({
            id: 'insufficient-funds',
            title: 'Insufficient funds or mint limit reached',
            message: 'The estimate includes gas...',
          });
          return;
        }

        let tx = await contract.methods.mint(auth, quantity).send({
          from: currentAccount,
          value: Web3.utils.toWei((quantity * 0.025).toFixed(3), 'ether'),
        });

        const output = [];
        // let mintedId = tx.events.Transfer.returnValues.tokenId;

        if (Array.isArray(tx.events.Transfer)) {
          for (const transfer of tx.events.Transfer) {
            let mintedId = transfer.returnValues.tokenId;

            let openseaURL =
              process.env.REACT_APP_CHAIN_ID === '1'
                ? 'https://opensea.io'
                : 'https://testnets.opensea.io';
            openseaURL += `/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;
            let raribleURL =
              process.env.REACT_APP_CHAIN_ID === '1'
                ? 'https://rarible.com'
                : 'https://rinkeby.rarible.com';
            raribleURL += `/token/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;

            output.push({ mintedId, openseaURL, raribleURL });
          }
        } else {
          let mintedId = tx.events.Transfer.returnValues.tokenId;

          let openseaURL =
            process.env.REACT_APP_CHAIN_ID === '1'
              ? 'https://opensea.io'
              : 'https://testnets.opensea.io';
          openseaURL += `/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;
          let raribleURL =
            process.env.REACT_APP_CHAIN_ID === '1'
              ? 'https://rarible.com'
              : 'https://rinkeby.rarible.com';
          raribleURL += `/token/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;

          setLoading(false);
          return [{ mintedId, openseaURL, raribleURL }];
        }

        // getInvites();
        setLoading(false);
        return output;
      } catch (e) {
        // catch race condition if nextToken was already minted
        // refreshing page in 5s... or something

        if (e.code === 4001) {
          showNotification({
            id: 'mint-reject',
            title: 'Transaction rejected successfully',
          });
        } else {
          // if there's an error, alert user
          console.error(e);
          showNotification({
            id: 'connection-failed',
            title: 'Something went wrong...',
            message: 'Please try refreshing the page',
            color: 'red',
          });
        }
      }

      setLoading(false);
    },
    [nextToken, currentAccount, setLoading]
  );

  // TODO set return for anything we add later
  return useMemo(() => {
    return {
      supply,
      base,
      getConfig,
      nextToken,
      getNextToken,
      sendMintRequest,
    };
  }, [supply, base, getConfig, nextToken, getNextToken, sendMintRequest]);
};

export default useContract;
