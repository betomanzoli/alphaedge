
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

// Function to get library from provider
const getLibrary = (provider: any): EthersWeb3Provider => {
  const library = new EthersWeb3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

// Initialize the injected connector
const metaMask = new MetaMask({ actions: {} });

interface Web3ProviderProps {
  children: React.ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <Web3ReactProvider connectors={[[metaMask, getLibrary]]}>
      {children}
    </Web3ReactProvider>
  );
}
