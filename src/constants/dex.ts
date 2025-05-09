
export const CHAIN_OPTIMISM_MAINNET = 10;
export const CHAIN_OPTIMISM_TESTNET = 420;

export const NETWORK_PARAMS = {
  [CHAIN_OPTIMISM_MAINNET]: {
    chainId: `0x${CHAIN_OPTIMISM_MAINNET.toString(16)}`,
    chainName: 'Optimism',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io']
  },
  [CHAIN_OPTIMISM_TESTNET]: {
    chainId: `0x${CHAIN_OPTIMISM_TESTNET.toString(16)}`,
    chainName: 'Optimism Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.optimism.io'],
    blockExplorerUrls: ['https://goerli-optimism.etherscan.io']
  }
};

// Real opXEN token address on Optimism
export const OPXEN_TOKEN_ADDRESS = '0x4bF66A12B801dAD73B3B4Ff026623eD7B4969489';
export const WETH_ADDRESS = '0x4200000000000000000000000000000000000006';

// Real opXEN/WETH pool on Optimism
export const OPXEN_POOL = {
  address: '0x1A0D5DAEBa1F72b3D3Ce9F86401da34A191D9Ee2',
  token0: OPXEN_TOKEN_ADDRESS,
  token1: WETH_ADDRESS,
  fee: 10000 // 1%
};

export const DEX_POOLS = [
  {
    name: 'opXEN/WETH 1%',
    address: OPXEN_POOL.address,
    token0: OPXEN_TOKEN_ADDRESS,
    token1: WETH_ADDRESS,
    fee: 10000
  },
  // Add other pools if available
];

export const UNISWAP_V3_ROUTER = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // Universal router on Optimism
