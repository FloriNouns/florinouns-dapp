import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { showNotification } from '@mantine/notifications';
import Web3 from 'web3';
import ipfsh from 'ipfsh';
import Invitelist from 'invitelist';
import Web3Context from '../context/Web3Context';
import F0 from '../abi/F0.json';

const useContract = () => {
  const { currentAccount, setLoading } = useContext(Web3Context);
  const [contract, setContract] = useState(null);
  const [supply, setSupply] = useState(null);
  const [base, setBase] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const connectToContract = () => {
      // Declare provider
      let provider;

      // If user is on correct chain, set MetaMask as provider
      if (
        window.ethereum &&
        window.ethereum.networkVersion === process.env.REACT_APP_CHAIN_ID
      ) {
        provider = window.ethereum;
      } else {
        // else if contract on mainnet, use infura mainnet
        if (process.env.REACT_APP_CHAIN_ID === 1)
          provider = process.env.REACT_APP_MAINNET_JSONRPC;
        // else use infura rinkeby
        provider = process.env.REACT_APP_RINKEBY_JSONRPC;
      }

      const web3 = new Web3(provider);
      setContract(
        () => new web3.eth.Contract(F0, process.env.REACT_APP_CONTRACT_ADDRESS)
      );
    };

    if (!contract) connectToContract();
  }, [contract]);

  // gets config from contract (check factoria dev docs)
  // TODO get other things from contract here if needed
  const getConfig = useCallback(async () => {
    if (!contract) return;

    setLoading(() => true);

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
        message: "We couldn't connect to the contract :(",
        color: 'red',
      });
    }

    setLoading(() => false);
  }, [contract, setLoading]);

  // gets next token from contract (factoria docs token>nextId)
  const getNextToken = useCallback(async () => {
    if (!contract) return;

    setLoading(() => true);

    try {
      let nextTokenId = await contract.methods.nextId().call();
      setNextToken(() => nextTokenId);
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        id: 'connection-failed',
        title: 'Something went wrong...',
        message: "We couldn't connect to the contract :(",
        color: 'red',
      });
    }

    setLoading(() => false);
  }, [contract, setLoading]);

  // gets invites from contract (minting with private invite)
  const getInvites = useCallback(async () => {
    // if there's no contract or invites already checked, return
    if (!contract || invites.length > 0 || !currentAccount) return;

    setLoading(() => true);

    try {
      // get invite lists
      let logs = await contract.getPastEvents('Invited', {
        fromBlock: 0,
        toBlock: 'latest',
      });

      // declare array of invites
      let invites = [];

      // for each list
      for (let log of logs) {
        // set key and digested IPFS cid
        let invite = {
          key: log.returnValues.key,
          cid: ipfsh.dtoc(log.returnValues.cid),
          condition: await contract.methods.invite(log.returnValues.key).call(),
        };
        // if key is 0x00... (public release list)
        if (
          invite.key ===
          '0x0000000000000000000000000000000000000000000000000000000000000000'
        ) {
          invite.addresses = [];
          invite.list = null;
          invite.proof = [];
          invite.invited = true;
        } else {
          let res = await fetch('https://ipfs.io/ipfs/' + invite.cid).then(
            (r) => {
              return r.json();
            }
          );
          invite.addresses = res.addresses;
          invite.list = new Invitelist(res.addresses);
          invite.proof = invite.list.proof(currentAccount);
          invite.invited = invite.list.verify(currentAccount, invite.proof);
        }
        invites.push(invite);
      }

      // set invites in state
      setInvites(() => invites);
    } catch (e) {
      // if there's an error, alert user
      console.error(e);
      showNotification({
        id: 'connection-failed',
        title: 'Something went wrong...',
        message: "We couldn't connect to the contract :(",
        color: 'red',
      });
    }

    setLoading(() => false);
  }, [contract, invites, currentAccount, setLoading]);

  // mint next token (factoria dev docs - minting with private invite)
  const mint = useCallback(
    async (inviteIndex) => {
      if (!contract || invites.length > 0 || !nextToken || !currentAccount)
        return;

      setLoading(() => true);

      try {
        let invite = invites[inviteIndex];
        let auth = { key: invite.key, proof: invite.proof };
        let tx = await contract.methods.mint(auth, nextToken).send({
          from: currentAccount,
          value: '' + invite.condition.price,
        });
        // This might be wrong
        let mintedId = tx.events.Transfer.returnValues.tokenId;
        let openseaURL =
          process.env.REACT_APP_CHAIN_ID === 1
            ? 'https://opensea.io'
            : 'https://testnets.opensea.io';
        openseaURL += `/assets/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;
        let raribleURL =
          process.env.REACT_APP_CHAIN_ID === 1
            ? 'https://rarible.com'
            : 'https://rinkeby.rarible.com';
        raribleURL += `/token/${process.env.REACT_APP_CONTRACT_ADDRESS}/${mintedId}`;

        setLoading(() => false);

        return [openseaURL, raribleURL];
      } catch (e) {
        // catch race condition if nextToken was already minted
        // refreshing page in 5s... or something

        // if there's an error, alert user
        console.error(e);
        showNotification({
          id: 'connection-failed',
          title: 'Something went wrong...',
          message: "We couldn't connect to the contract :(",
          color: 'red',
        });
      }

      setLoading(() => false);
    },
    [contract, invites, nextToken, currentAccount, setLoading]
  );

  // TODO set return for anything we add later
  return useMemo(() => {
    return {
      supply,
      base,
      getConfig,
      nextToken,
      getNextToken,
      invites,
      getInvites,
      mint,
    };
  }, [
    supply,
    base,
    getConfig,
    nextToken,
    getNextToken,
    invites,
    getInvites,
    mint,
  ]);
};

export default useContract;
