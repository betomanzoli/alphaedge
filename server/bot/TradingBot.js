const { ethers } = require('ethers');
const EventEmitter = require('events');
const UniswapV3RouterABI = require('../abis/UniswapV3Router.json');
const axios = require('axios');

class TradingBot extends EventEmitter {
  constructor() {
    super();
    
    this.isRunning = false;
    this.config = {
      strategy: 'buyDip',
      investmentAmount: 0.1, // ETH
      buyThreshold: 5, // %
      stopLoss: 10, // %
      mode: 'test' // test or production
    };
    
    // Token and pool configurations
    this.tokens = {
      opXEN: {
        address: '0x4bF66A12B801dAD73B3B4Ff026623eD7B4969489', // opXEN on Optimism
        decimals: 18
      },
      WETH: {
        address: '0x4200000000000000000000000000000000000006', // WETH on Optimism
        decimals: 18
      }
    };
    
    // Price monitoring data
    this.priceData = {
      current: 0,
      previous: 0,
      highWatermark: 0,
      lowWatermark: Infinity,
      history: []
    };
    
    // Initialize trading state
    this.tradingState = {
      lastTradeTimestamp: 0,
      consecutiveBuys: 0,
      buyAvgPrice: 0,
      totalTokensBought: 0,
      totalEthSpent: 0
    };
    
    // Uniswap Router - would be initialized in start()
    this.uniswapRouter = null;
    this.provider = null;
    this.signer = null;
    
    // Price monitoring interval
    this.monitoringInterval = null;
    
    // Pool address for opXEN/WETH
    this.poolAddress = '0x1A0D5DAEBa1F72b3D3Ce9F86401da34A191D9Ee2'; // opXEN/WETH pool
  }
  
  async start() {
    if (this.isRunning) {
      console.log('Trading bot is already running');
      return;
    }
    
    try {
      console.log('Starting trading bot...');
      this.isRunning = true;
      
      // Initialize blockchain connection
      await this.initializeBlockchainConnection();
      
      // Start price monitoring
      this.startPriceMonitoring();
      
      this.emit('botStarted', { timestamp: new Date() });
      console.log('Trading bot started successfully');
    } catch (error) {
      console.error('Error starting trading bot:', error);
      this.isRunning = false;
      this.emit('botError', { error: error.message });
    }
  }
  
  async initializeBlockchainConnection() {
    try {
      // Use environment variable for RPC URL
      const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io';
      
      // Create provider
      this.provider = new ethers.JsonRpcProvider(OPTIMISM_RPC_URL);
      
      // In production, would use a private key from secure storage
      if (process.env.TRADER_PRIVATE_KEY) {
        this.signer = new ethers.Wallet(process.env.TRADER_PRIVATE_KEY, this.provider);
        console.log('Wallet connected:', this.signer.address);
      } else {
        console.log('No private key provided, working in read-only mode');
      }
      
      // Initialize Uniswap router contract
      const UNISWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // Uniswap V3 Router
      this.uniswapRouter = new ethers.Contract(
        UNISWAP_ROUTER_ADDRESS,
        UniswapV3RouterABI,
        this.signer || this.provider
      );
      
      console.log('Blockchain connection initialized successfully');
    } catch (error) {
      console.error('Error initializing blockchain connection:', error);
      throw error;
    }
  }
  
  stop() {
    if (!this.isRunning) {
      console.log('Trading bot is not running');
      return;
    }
    
    console.log('Stopping trading bot...');
    
    // Clear monitoring interval
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    this.isRunning = false;
    this.emit('botStopped', { timestamp: new Date() });
    console.log('Trading bot stopped successfully');
  }
  
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.emit('configUpdated', { config: this.config });
    console.log('Bot configuration updated:', this.config);
    return this.config;
  }
  
  startPriceMonitoring() {
    console.log('Starting price monitoring...');
    
    // Get initial price
    this.monitorPrice();
    
    // Set up interval for monitoring
    this.monitoringInterval = setInterval(() => {
      this.monitorPrice();
    }, 30000); // Check price every 30 seconds
  }
  
  async monitorPrice() {
    try {
      // Get actual price from pool or API
      const newPrice = await this.getTokenPrice();
      
      // Update price data
      this.priceData.previous = this.priceData.current;
      this.priceData.current = newPrice;
      
      // Update high/low watermarks
      if (newPrice > this.priceData.highWatermark) {
        this.priceData.highWatermark = newPrice;
      }
      if (newPrice < this.priceData.lowWatermark) {
        this.priceData.lowWatermark = newPrice;
      }
      
      // Add to price history
      this.priceData.history.push({
        timestamp: Date.now(),
        price: newPrice
      });
      
      // Keep history limited to 1000 data points
      if (this.priceData.history.length > 1000) {
        this.priceData.history.shift();
      }
      
      // Emit price update
      this.emit('priceUpdate', {
        price: newPrice,
        timestamp: Date.now()
      });
      
      // Check for trading opportunities based on strategy
      if (this.isRunning && this.priceData.previous > 0) {
        this.executeStrategy();
      }
    } catch (error) {
      console.error('Error monitoring price:', error);
      this.emit('botError', { error: error.message });
      
      // Fallback to mock price if real price can't be obtained
      if (this.priceData.current === 0) {
        const mockPrice = this.getMockPrice();
        this.priceData.current = mockPrice;
        console.log('Using mock price as fallback:', mockPrice);
      }
    }
  }
  
  async getTokenPrice() {
    try {
      // Try to get price from blockchain first
      if (this.provider && this.poolAddress) {
        try {
          // Get UniswapV3 pool data
          const poolContract = new ethers.Contract(
            this.poolAddress,
            [
              'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'
            ],
            this.provider
          );
          
          // Get the current sqrt price
          const slot0 = await poolContract.slot0();
          const sqrtPriceX96 = slot0.sqrtPriceX96;
          
          // Convert sqrtPriceX96 to price
          // For token0/token1 price: (sqrtPriceX96/2^96)^2
          const numerator = sqrtPriceX96 * sqrtPriceX96;
          const denominator = 2n ** 192n;
          const price = Number(numerator) / Number(denominator);
          
          console.log('Real price retrieved from blockchain:', price);
          return price;
        } catch (error) {
          console.error('Error getting price from blockchain:', error);
          // Fall through to API method
        }
      }
      
      // Fallback to price API
      try {
        // Example API for getting token price (would replace with actual API)
        const apiUrl = `https://api.coingecko.com/api/v3/simple/token_price/optimistic-ethereum?contract_addresses=${this.tokens.opXEN.address}&vs_currencies=eth`;
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data[this.tokens.opXEN.address.toLowerCase()]) {
          const price = response.data[this.tokens.opXEN.address.toLowerCase()].eth;
          console.log('Real price retrieved from API:', price);
          return price;
        }
      } catch (apiError) {
        console.error('Error getting price from API:', apiError);
        // Fall through to mock price
      }
      
      // If all else fails, use mock price
      return this.getMockPrice();
    } catch (error) {
      console.error('Error in getTokenPrice:', error);
      return this.getMockPrice();
    }
  }
  
  executeStrategy() {
    switch (this.config.strategy) {
      case 'buyDip':
        this.executeBuyDipStrategy();
        break;
      case 'dca':
        this.executeDCAStrategy();
        break;
      case 'volatility':
        this.executeVolatilityStrategy();
        break;
      default:
        console.log(`Strategy ${this.config.strategy} not implemented`);
    }
  }
  
  executeBuyDipStrategy() {
    // Calculate price change percentage
    const priceChange = ((this.priceData.current - this.priceData.previous) / this.priceData.previous) * 100;
    
    // Check if price dropped below threshold
    if (priceChange <= -this.config.buyThreshold) {
      console.log(`Price drop detected: ${priceChange.toFixed(2)}% - Executing buy order`);
      
      // Execute buy order
      this.executeBuyOrder(this.config.investmentAmount);
    }
    
    // Check stop loss
    const highToCurrentChange = ((this.priceData.current - this.priceData.highWatermark) / this.priceData.highWatermark) * 100;
    if (this.tradingState.totalTokensBought > 0 && highToCurrentChange <= -this.config.stopLoss) {
      console.log(`Stop loss triggered: ${highToCurrentChange.toFixed(2)}% - Executing sell order`);
      
      // Execute sell order
      this.executeSellOrder(this.tradingState.totalTokensBought);
    }
  }
  
  executeDCAStrategy() {
    // Dollar Cost Averaging - buy at regular intervals
    const currentTime = Date.now();
    const timeSinceLastTrade = currentTime - this.tradingState.lastTradeTimestamp;
    
    // In this example, buy every hour (3600000 ms)
    if (timeSinceLastTrade >= 3600000) {
      console.log('DCA interval reached - Executing buy order');
      
      // Execute buy order
      this.executeBuyOrder(this.config.investmentAmount);
    }
  }
  
  executeVolatilityStrategy() {
    // Calculate price volatility using standard deviation
    if (this.priceData.history.length < 10) {
      return; // Need more data points
    }
    
    const prices = this.priceData.history.slice(-10).map(item => item.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    const variance = prices.reduce((sum, price) => {
      const diff = price - mean;
      return sum + (diff * diff);
    }, 0) / prices.length;
    
    const volatility = Math.sqrt(variance) / mean * 100; // as percentage
    
    // If volatility is high and price is near lows, buy
    if (volatility > 5) { // 5% volatility threshold
      const distanceFromLow = ((this.priceData.current - this.priceData.lowWatermark) / this.priceData.lowWatermark) * 100;
      
      if (distanceFromLow < 2) { // Close to recent low
        console.log(`High volatility detected (${volatility.toFixed(2)}%) near low - Executing buy order`);
        
        // Execute buy order
        this.executeBuyOrder(this.config.investmentAmount);
      }
    }
  }
  
  async executeBuyOrder(ethAmount) {
    try {
      if (this.config.mode === 'test') {
        console.log(`[TEST MODE] Would execute buy order for ${ethAmount} ETH at price ${this.priceData.current}`);
        
        // Simulate transaction in test mode
        const tokenAmount = ethAmount / this.priceData.current;
        this.recordTransaction('buy', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
          tokenAmount,
          ethAmount
        };
      } else {
        console.log(`Executing buy order for ${ethAmount} ETH at price ${this.priceData.current}`);
        
        // Execute an actual blockchain transaction
        const tx = await this.executeUniswapSwap(
          ethAmount,
          this.tokens.WETH.address,
          this.tokens.opXEN.address
        );
        
        // Calculate the token amount based on price
        const tokenAmount = ethAmount / this.priceData.current;
        
        // Record the transaction
        this.recordTransaction('buy', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: tx.hash,
          tokenAmount,
          ethAmount
        };
      }
    } catch (error) {
      console.error('Error executing buy order:', error);
      this.emit('botError', { error: error.message });
      
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  async executeSellOrder(tokenAmount) {
    try {
      if (this.config.mode === 'test') {
        console.log(`[TEST MODE] Would execute sell order for ${tokenAmount} opXEN at price ${this.priceData.current}`);
        
        // Simulate transaction in test mode
        const ethAmount = tokenAmount * this.priceData.current;
        this.recordTransaction('sell', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
          tokenAmount,
          ethAmount
        };
      } else {
        console.log(`Executing sell order for ${tokenAmount} opXEN at price ${this.priceData.current}`);
        
        // Execute an actual blockchain transaction
        const ethAmount = tokenAmount * this.priceData.current;
        const tx = await this.executeUniswapSwap(
          tokenAmount,
          this.tokens.opXEN.address,
          this.tokens.WETH.address
        );
        
        // Record the transaction
        this.recordTransaction('sell', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: tx.hash,
          tokenAmount,
          ethAmount
        };
      }
    } catch (error) {
      console.error('Error executing sell order:', error);
      this.emit('botError', { error: error.message });
      
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  async executeUniswapSwap(amountIn, tokenInAddress, tokenOutAddress) {
    try {
      if (!this.signer) {
        throw new Error('Signer not initialized. Cannot execute trades.');
      }
      
      console.log(`Executing Uniswap swap: ${amountIn} of ${tokenInAddress} to ${tokenOutAddress}`);
      
      // Approve token spending if selling tokens (not needed for ETH)
      if (tokenInAddress !== this.tokens.WETH.address) {
        const tokenContract = new ethers.Contract(
          tokenInAddress,
          [
            'function approve(address spender, uint256 amount) external returns (bool)'
          ],
          this.signer
        );
        
        const approvalTx = await tokenContract.approve(
          this.uniswapRouter.target,
          ethers.parseUnits(amountIn.toString(), 18)
        );
        
        console.log('Approval transaction sent:', approvalTx.hash);
        await approvalTx.wait();
        console.log('Approval confirmed');
      }
      
      // Set up swap parameters
      const path = ethers.solidityPacked(['address', 'uint24', 'address'], [
        tokenInAddress,
        3000, // 0.3% fee tier
        tokenOutAddress
      ]);
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      const amountOutMinimum = 0; // In production, would calculate based on slippage tolerance
      
      // Execute swap
      let tx;
      
      if (tokenInAddress === this.tokens.WETH.address) {
        // ETH to Token
        tx = await this.uniswapRouter.swapExactETHForTokens(
          amountOutMinimum,
          [tokenInAddress, tokenOutAddress],
          this.signer.address,
          deadline,
          { value: ethers.parseEther(amountIn.toString()) }
        );
      } else {
        // Token to ETH
        tx = await this.uniswapRouter.swapExactTokensForETH(
          ethers.parseUnits(amountIn.toString(), 18),
          amountOutMinimum,
          [tokenInAddress, tokenOutAddress],
          this.signer.address,
          deadline
        );
      }
      
      console.log('Swap transaction sent:', tx.hash);
      await tx.wait();
      console.log('Swap confirmed');
      
      return tx;
    } catch (error) {
      console.error('Error executing Uniswap swap:', error);
      throw error;
    }
  }
  
  recordTransaction(type, tokenAmount, ethAmount, price) {
    const transaction = {
      id: `tx-${Date.now()}`,
      timestamp: new Date(),
      type,
      tokenAmount,
      tokenSymbol: 'opXEN',
      price,
      total: ethAmount,
      status: 'completed',
      txHash: `0x${Math.random().toString(16).substring(2, 14)}`
    };
    
    if (type === 'buy') {
      // Update trading state
      this.tradingState.lastTradeTimestamp = Date.now();
      this.tradingState.consecutiveBuys++;
      this.tradingState.totalTokensBought += tokenAmount;
      this.tradingState.totalEthSpent += ethAmount;
      
      // Update average buy price
      this.tradingState.buyAvgPrice = this.tradingState.totalEthSpent / this.tradingState.totalTokensBought;
    } else if (type === 'sell') {
      // Update trading state
      this.tradingState.lastTradeTimestamp = Date.now();
      this.tradingState.consecutiveBuys = 0;
      this.tradingState.totalTokensBought -= tokenAmount;
      this.tradingState.totalEthSpent -= ethAmount;
    }
    
    // Emit transaction event
    this.emit('transaction', transaction);
    
    return transaction;
  }
  
  getMockPrice() {
    // Generate a realistic mock price with some randomness
    if (this.priceData.current === 0) {
      // Initial price
      return 0.00022;
    }
    
    // Add some random volatility
    const volatility = 0.03; // 3% volatility
    const change = (Math.random() * volatility * 2) - volatility;
    
    return this.priceData.current * (1 + change);
  }
  
  getStatus() {
    return {
      isRunning: this.isRunning,
      config: this.config,
      priceData: {
        current: this.priceData.current,
        high24h: this.priceData.highWatermark,
        low24h: this.priceData.lowWatermark,
        change24h: this.priceData.previous > 0 
          ? ((this.priceData.current - this.priceData.previous) / this.priceData.previous) * 100
          : 0
      },
      tradingState: this.tradingState,
      lastUpdate: new Date()
    };
  }
}

module.exports = TradingBot;
