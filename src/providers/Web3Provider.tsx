
import React from 'react';
import { Web3ReactProvider, Web3ReactHooks, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

// Initialize the injected connector
const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
);

// Create an array of connector-hooks pairs
const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];

interface Web3ProviderProps {
  children: React.ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      {children}
    </Web3ReactProvider>
  );
}
