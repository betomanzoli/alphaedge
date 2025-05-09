
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

// This function gets the library instance from the provider
function getLibrary(provider: any): EthersWeb3Provider {
  const library = new EthersWeb3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}
