const { ethers } = require('ethers');
const EventEmitter = require('events');
const UniswapV3RouterABI = require('../abis/UniswapV3Router.json');

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
        address: '0x0000000000000000000000000000000000000000', // Replace with actual address
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
    
    // Price monitoring interval
    this.monitoringInterval = null;
  }
  
  async start() {
    if (this.isRunning) {
      console.log('Trading bot is already running');
      return;
    }
    
    try {
      console.log('Starting trading bot...');
      this.isRunning = true;
      
      // In a real implementation, initialize blockchain connection
      // this.initializeBlockchainConnection();
      
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
    
    // In a real implementation, this would use WebSockets or an API to get real-time prices
    this.monitoringInterval = setInterval(() => {
      this.monitorPrice();
    }, 5000); // Check price every 5 seconds
  }
  
  async monitorPrice() {
    try {
      // In a real implementation, get actual price from blockchain or API
      const newPrice = this.getMockPrice();
      
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
        
        // In a real implementation, this would execute an actual blockchain transaction
        // const tx = await this.executeUniswapSwap(ethAmount, this.tokens.WETH.address, this.tokens.opXEN.address);
        
        // For now, simulate successful transaction
        const tokenAmount = ethAmount / this.priceData.current;
        this.recordTransaction('buy', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
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
        
        // In a real implementation, this would execute an actual blockchain transaction
        // const tx = await this.executeUniswapSwap(tokenAmount, this.tokens.opXEN.address, this.tokens.WETH.address);
        
        // For now, simulate successful transaction
        const ethAmount = tokenAmount * this.priceData.current;
        this.recordTransaction('sell', tokenAmount, ethAmount, this.priceData.current);
        
        return {
          success: true,
          txHash: `0x${Math.random().toString(16).substring(2, 14)}`,
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
