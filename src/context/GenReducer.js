const genReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ACCOUNT':
      return {
        currentAccount: action.payload,
        loading: state.loading,
      };
    case 'SET_LOADING':
      return {
        currentAccount: state.currentAccount,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default genReducer;
