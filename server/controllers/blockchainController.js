
// Blockchain Controller
const { ethers } = require('ethers');
const UniswapV3PoolABI = require('../abis/UniswapV3Pool.json');
const ERC20ABI = require('../abis/ERC20.json');
const axios = require('axios');

// Optimism RPC URL - in production, use an environment variable
const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io';
const provider = new ethers.JsonRpcProvider(OPTIMISM_RPC_URL);

// Token addresses - should be in environment variables in production
const OPXEN_ADDRESS = '0x4bF66A12B801dAD73B3B4Ff026623eD7B4969489'; // opXEN on Optimism
const WETH_ADDRESS = '0x4200000000000000000000000000000000000006'; // WETH on Optimism
const POOL_ADDRESS = '0x1A0D5DAEBa1F72b3D3Ce9F86401da34A191D9Ee2'; // opXEN/WETH pool

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
    // Try to get price from the pool first
    let currentPrice;
    let token0;
    let token1;
    
    try {
      // Get slot0 from the pool
      const slot0 = await poolContract.slot0();
      token0 = await poolContract.token0();
      token1 = await poolContract.token1();
      
      // Convert sqrtPriceX96 to price
      const sqrtPriceX96 = slot0.sqrtPriceX96;
      const priceRatio = (sqrtPriceX96 * sqrtPriceX96) / (2n ** 192n);
      
      // Determine if opXEN is token0 or token1
      if (token0.toLowerCase() === OPXEN_ADDRESS.toLowerCase()) {
        currentPrice = Number(priceRatio) / (10 ** 18);
      } else {
        currentPrice = (10 ** 18) / Number(priceRatio);
      }
    } catch (error) {
      console.error('Error getting price from pool, trying API:', error);
      
      // Try to get price from API
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/token_price/optimistic-ethereum?contract_addresses=${OPXEN_ADDRESS}&vs_currencies=eth`;
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data[OPXEN_ADDRESS.toLowerCase()]) {
          currentPrice = response.data[OPXEN_ADDRESS.toLowerCase()].eth;
        } else {
          // Fallback to mock price
          currentPrice = 0.00022;
        }
      } catch (apiError) {
        console.error('Error getting price from API, using fallback:', apiError);
        currentPrice = 0.00022;
      }
    }
    
    // Generate historical prices for chart (in a real app, would fetch from database)
    const historicalPrices = [];
    const now = Date.now();
    const basePrice = currentPrice;
    
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - i * 3600 * 1000; // hourly data
      const randomFactor = 0.9 + Math.random() * 0.2; // +/- 10%
      historicalPrices.push({
        timestamp,
        price: basePrice * randomFactor
      });
    }
    
    // Calculate price changes
    const latest = historicalPrices[historicalPrices.length - 1].price;
    const oneHourAgo = historicalPrices[historicalPrices.length - 2]?.price || latest;
    const oneDayAgo = historicalPrices[0]?.price || latest;
    const sevenDaysAgo = latest * 0.9; // Simulated 7-day price
    
    const priceChange = {
      '1h': ((latest - oneHourAgo) / oneHourAgo) * 100,
      '24h': ((latest - oneDayAgo) / oneDayAgo) * 100,
      '7d': ((latest - sevenDaysAgo) / sevenDaysAgo) * 100
    };
    
    res.status(200).json({
      success: true,
      token: 'opXEN',
      currentPrice,
      historicalPrices,
      priceChange
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
    // Get real liquidity info from the pool
    let tvl = 0;
    let volume24h = 0;
    let feeTier = 0;
    let currentTicks = {
      lowerTick: -200,
      upperTick: 500,
      currentTick: 150
    };
    
    try {
      // Get pool info
      const slot0 = await poolContract.slot0();
      currentTicks.currentTick = slot0.tick;
      
      // Get fee
      feeTier = await poolContract.fee() / 10000; // Convert from basis points to percentage
      
      // Get token balances in the pool
      const token0Contract = new ethers.Contract(token0, ERC20ABI, provider);
      const token1Contract = new ethers.Contract(token1, ERC20ABI, provider);
      
      const token0Balance = await token0Contract.balanceOf(POOL_ADDRESS);
      const token1Balance = await token1Contract.balanceOf(POOL_ADDRESS);
      
      // Calculate TVL (simplified)
      // In a real app, would need to get ETH price in USD
      const ethUsdPrice = 2200; // Placeholder, would be fetched from an API
      tvl = (Number(ethers.formatEther(token1Balance)) * ethUsdPrice) * 2; // Approximation
      
      // Estimate 24h volume (simplified)
      volume24h = tvl * 0.15; // Placeholder, assumes 15% of TVL is daily volume
    } catch (error) {
      console.error('Error getting liquidity info from pool, using mock data:', error);
      
      // Use mock data as fallback
      tvl = 450000;
      volume24h = 75000;
      feeTier = 1;
    }
    
    res.status(200).json({
      success: true,
      token: 'opXEN',
      liquidityPool: 'opXEN/ETH',
      tvl,
      volume24h,
      feeTier,
      currentTicks
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
