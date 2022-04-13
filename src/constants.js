const CONTRACT_ADDRESS = '';

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
