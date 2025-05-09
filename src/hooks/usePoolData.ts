
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { CHAIN_OPTIMISM_MAINNET, DEX_POOLS } from '@/constants/dex';
import { useToast } from '@/hooks/use-toast';

const UNISWAP_POOL_ABI = [
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
  'function liquidity() external view returns (uint128)',
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function fee() external view returns (uint24)'
];

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)'
];

export function usePoolData(poolAddress: string) {
  const context = useWeb3React<ethers.providers.Web3Provider>();
  const { library, chainId } = context;
  const active = context.active;
  
  const [loading, setLoading] = useState(true);
  const [pool, setPool] = useState<Pool | null>(null);
  const [poolData, setPoolData] = useState<any>({
    sqrtPriceX96: '0',
    tick: 0,
    liquidity: '0',
    token0: null,
    token1: null,
    fee: 0,
    price: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!active || !library || !poolAddress) return;

      setLoading(true);
      try {
        const provider = library.getSigner().provider;
        const poolContract = new ethers.Contract(
          poolAddress,
          UNISWAP_POOL_ABI,
          provider
        );

        // Get pool basic information
        const [slot0Data, liquidity, token0Address, token1Address, fee] = await Promise.all([
          poolContract.slot0(),
          poolContract.liquidity(),
          poolContract.token0(),
          poolContract.token1(),
          poolContract.fee()
        ]);

        // Get token information
        const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, provider);
        const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, provider);

        const [
          token0Name, token0Symbol, token0Decimals,
          token1Name, token1Symbol, token1Decimals
        ] = await Promise.all([
          token0Contract.name(),
          token0Contract.symbol(),
          token0Contract.decimals(),
          token1Contract.name(),
          token1Contract.symbol(),
          token1Contract.decimals()
        ]);

        // Create token instances for SDK
        const token0 = new Token(
          chainId || CHAIN_OPTIMISM_MAINNET,
          token0Address,
          token0Decimals,
          token0Symbol,
          token0Name
        );

        const token1 = new Token(
          chainId || CHAIN_OPTIMISM_MAINNET,
          token1Address,
          token1Decimals,
          token1Symbol,
          token1Name
        );

        // Create pool instance
        const poolInstance = new Pool(
          token0,
          token1,
          fee,
          slot0Data.sqrtPriceX96.toString(),
          liquidity.toString(),
          slot0Data.tick
        );

        // Calculate price
        let price;
        try {
          if (token0Symbol === 'WETH' || token0Symbol === 'ETH') {
            price = 1 / Number(poolInstance.token0Price.toSignificant(6));
          } else if (token1Symbol === 'WETH' || token1Symbol === 'ETH') {
            price = Number(poolInstance.token1Price.toSignificant(6));
          } else {
            price = Number(poolInstance.token0Price.toSignificant(6));
          }
        } catch (error) {
          console.error("Error calculating price:", error);
          price = 0;
        }

        setPoolData({
          sqrtPriceX96: slot0Data.sqrtPriceX96.toString(),
          tick: slot0Data.tick,
          liquidity: liquidity.toString(),
          token0: {
            address: token0Address,
            name: token0Name,
            symbol: token0Symbol,
            decimals: token0Decimals
          },
          token1: {
            address: token1Address,
            name: token1Name,
            symbol: token1Symbol,
            decimals: token1Decimals
          },
          fee,
          price
        });

        setPool(poolInstance);
      } catch (error) {
        console.error("Error fetching pool data:", error);
        toast({
          title: "Erro ao carregar dados do pool",
          description: "Não foi possível obter informações do pool.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [active, library, poolAddress, chainId]);

  return { pool, poolData, loading };
}

export function useAllPoolsData() {
  const context = useWeb3React<ethers.providers.Web3Provider>();
  const { library, chainId } = context;
  const active = context.active;
  
  const [poolsData, setPoolsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllPools = async () => {
      if (!active || !library) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        const provider = library.getSigner().provider;
        const poolsPromises = DEX_POOLS.map(async (poolInfo) => {
          try {
            const poolContract = new ethers.Contract(
              poolInfo.address,
              UNISWAP_POOL_ABI,
              provider
            );

            // Get basic pool information
            const [slot0Data, liquidity] = await Promise.all([
              poolContract.slot0(),
              poolContract.liquidity(),
            ]);

            // Convert sqrtPriceX96 to price (simplified)
            const sqrtPriceX96 = slot0Data.sqrtPriceX96.toString();
            const price = Number(sqrtPriceX96) ** 2 / (2 ** 192);
            
            // In a real implementation, you would need to adjust based on token decimals
            const adjustedPrice = price / 1e12; // Simplified adjustment

            return {
              ...poolInfo,
              sqrtPriceX96,
              tick: slot0Data.tick,
              liquidity: liquidity.toString(),
              price: adjustedPrice,
            };
          } catch (error) {
            console.error(`Error fetching pool ${poolInfo.address}:`, error);
            return {
              ...poolInfo,
              error: true,
            };
          }
        });

        const results = await Promise.all(poolsPromises);
        setPoolsData(results);
      } catch (error) {
        console.error("Error fetching pools data:", error);
        toast({
          title: "Erro ao carregar dados dos pools",
          description: "Não foi possível obter informações dos pools.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllPools();
  }, [active, library, chainId]);

  return { poolsData, loading };
}
