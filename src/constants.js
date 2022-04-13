const CONTRACT_ADDRESS = '0xcfD8Cf374857A6f01818cb08bf56190478A3C01f';

const transformMetadata = (metadata) => {
  return {
    name: metadata.name,
    image: metadata.image,
    /* Only using below if we include noun traits */
    // backgroundColor: metadata.background_color,
    // attributes: metadata.attributes,
  };
};

export { CONTRACT_ADDRESS, transformMetadata };
