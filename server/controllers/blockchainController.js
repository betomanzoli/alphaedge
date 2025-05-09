
// Blockchain Controller
const { ethers } = require('ethers');
const UniswapV3PoolABI = require('../abis/UniswapV3Pool.json');
const ERC20ABI = require('../abis/ERC20.json');

// Optimism RPC URL - in production, use an environment variable
const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io';
const provider = new ethers.JsonRpcProvider(OPTIMISM_RPC_URL);

// Token addresses - should be in environment variables in production
const OPXEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual opXEN address
const WETH_ADDRESS = '0x4200000000000000000000000000000000000006'; // WETH on Optimism
const POOL_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with opXEN/WETH pool address

// Initialize contracts
const tokenContract = new ethers.Contract(OPXEN_ADDRESS, ERC20ABI, provider);
const poolContract = new ethers.Contract(POOL_ADDRESS, UniswapV3PoolABI, provider);

const getBalance = async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Wallet address is required'
      });
    }
    
    // Get ETH balance
    const ethBalance = await provider.getBalance(address);
    
    // Get token balance
    const tokenBalance = await tokenContract.balanceOf(address);
    const tokenDecimals = await tokenContract.decimals();
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    
    const balances = {
      eth: ethers.formatEther(ethBalance),
      token: {
        name: tokenName,
        symbol: tokenSymbol,
        balance: ethers.formatUnits(tokenBalance, tokenDecimals)
      }
    };
    
    res.status(200).json({
      success: true,
      balances
    });
  } catch (error) {
    console.error('Error in getBalance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get balance',
      error: error.message
    });
  }
};

const getTokenPrice = async (req, res) => {
  try {
    // In a real implementation, this would get the actual price from the pool
    // For now, returning mock data
    
    // Get slot0 from the pool (if pool address is valid)
    let currentPrice;
    let token0;
    let token1;
    
    try {
      // This would work with a real pool address
      const slot0 = await poolContract.slot0();
      token0 = await poolContract.token0();
      token1 = await poolContract.token1();
      
      // Convert sqrtPriceX96 to price
      const sqrtPriceX96 = slot0.sqrtPriceX96;
      const priceRatio = (sqrtPriceX96 * sqrtPriceX96) / (2n ** 192n);
      
      // Determine if opXEN is token0 or token1
      if (token0.toLowerCase() === OPXEN_ADDRESS.toLowerCase()) {
        currentPrice = priceRatio;
      } else {
        currentPrice = 1n / priceRatio;
      }
    } catch (error) {
      console.error('Error getting real price, using mock data:', error);
      // Mock price data
      currentPrice = 0.00022;
    }
    
    // Generate mock historical data
    const historicalPrices = [];
    const now = Date.now();
    const basePrice = 0.00022;
    
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - i * 3600 * 1000; // hourly data
      const randomFactor = 0.9 + Math.random() * 0.2; // +/- 10%
      historicalPrices.push({
        timestamp,
        price: basePrice * randomFactor
      });
    }
    
    res.status(200).json({
      success: true,
      token: 'opXEN',
      currentPrice,
      historicalPrices,
      priceChange: {
        '1h': 2.5,
        '24h': -3.2,
        '7d': 12.1
      }
    });
  } catch (error) {
    console.error('Error in getTokenPrice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get token price',
      error: error.message
    });
  }
};

const getLiquidityInfo = async (req, res) => {
  try {
    // In a real implementation, this would get actual liquidity info from the pool
    // For now, returning mock data
    
    res.status(200).json({
      success: true,
      token: 'opXEN',
      liquidityPool: 'opXEN/ETH',
      tvl: 450000, // Total value locked in USD
      volume24h: 75000, // 24h volume in USD
      feeTier: 1, // 1%
      currentTicks: {
        lowerTick: -200,
        upperTick: 500,
        currentTick: 150
      }
    });
  } catch (error) {
    console.error('Error in getLiquidityInfo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get liquidity info',
      error: error.message
    });
  }
};

module.exports = {
  getBalance,
  getTokenPrice,
  getLiquidityInfo
};
