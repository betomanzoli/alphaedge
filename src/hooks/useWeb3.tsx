
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ethers } from 'ethers';
import { CHAIN_OPTIMISM_MAINNET, CHAIN_OPTIMISM_TESTNET, NETWORK_PARAMS } from '@/constants/dex';
import { useToast } from '@/hooks/use-toast';

export function useWeb3() {
  const { 
    account,
    chainId,
    connector,
    provider: web3Provider
  } = useWeb3React();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  
  // Create a proper ethers provider from the web3-react provider
  const provider = web3Provider ? new ethers.providers.Web3Provider(web3Provider) : undefined;
  const active = !!account && !!provider;
  
  const connect = async () => {
    setIsConnecting(true);
    try {
      if (connector instanceof MetaMask) {
        await connector.activate();
        toast({
          title: "Conexão estabelecida",
          description: "Sua carteira foi conectada com sucesso.",
        });
      }
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
    if (connector instanceof MetaMask) {
      connector.deactivate();
    }
  };

  const switchToNetwork = async (targetChainId: number) => {
    if (!provider || !web3Provider) {
      toast({
        title: "Provider não encontrado",
        description: "Não foi possível encontrar um provider compatível.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // For MetaMask or similar wallets
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          // Try to switch to the network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${targetChainId.toString(16)}` }],
          });
        } catch (switchError: any) {
          // If the network is not added to MetaMask, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
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
      }
    } catch (error) {
      console.error("Error switching network:", error);
      toast({
        title: "Erro ao trocar de rede",
        description: "Não foi possível mudar para a rede solicitada.",
        variant: "destructive"
      });
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
    library: provider,
    chainId,
    isOptimismNetwork
  };
}
