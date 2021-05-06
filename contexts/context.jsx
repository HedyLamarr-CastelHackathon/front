import React, { useReducer } from 'react';

const makeContext = ({ context: Context, defaultState, reducer }) => {
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    const value = { state, dispatch };
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`${Context.displayName ?? 'Context'} must be used within a provider`);
    }
    return context;
  };

  return { Provider, useContext };
};

export default makeContext;
