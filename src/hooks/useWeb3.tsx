
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { CHAIN_OPTIMISM_MAINNET, CHAIN_OPTIMISM_TESTNET, NETWORK_PARAMS } from '@/constants/dex';
import { useToast } from '@/hooks/use-toast';

// Configure supported chains
export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_OPTIMISM_MAINNET, CHAIN_OPTIMISM_TESTNET]
});

export function useWeb3() {
  const context = useWeb3React<ethers.providers.Web3Provider>();
  const { activate, deactivate, account, library, chainId } = context;
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const active = context.active;

  const connect = async () => {
    setIsConnecting(true);
    try {
      await activate(injected);
      toast({
        title: "Conexão estabelecida",
        description: "Sua carteira foi conectada com sucesso.",
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar à carteira.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  const switchToNetwork = async (targetChainId: number) => {
    if (!library?.provider?.request) {
      toast({
        title: "Provider não encontrado",
        description: "Não foi possível encontrar um provider compatível.",
        variant: "destructive"
      });
      return;
    }

    const provider = library.provider;
    
    try {
      // Try to switch to the network
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // If the network is not added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_PARAMS[targetChainId]],
          });
        } catch (addError) {
          console.error("Error adding network:", addError);
          toast({
            title: "Erro ao adicionar rede",
            description: "Não foi possível adicionar a rede à sua carteira.",
            variant: "destructive"
          });
        }
      } else {
        console.error("Error switching network:", switchError);
        toast({
          title: "Erro ao trocar de rede",
          description: "Não foi possível mudar para a rede solicitada.",
          variant: "destructive"
        });
      }
    }
  };

  const isOptimismNetwork = chainId === CHAIN_OPTIMISM_MAINNET || chainId === CHAIN_OPTIMISM_TESTNET;

  return {
    connect,
    disconnect,
    switchToNetwork,
    isConnecting,
    active,
    account,
    library,
    chainId,
    isOptimismNetwork
  };
}
