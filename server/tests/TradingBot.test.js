
const { describe, it, beforeEach, afterEach, expect, jest } = require('@jest/globals');
const TradingBot = require('../bot/TradingBot');
const EventEmitter = require('events');

// Mock do ethers
jest.mock('ethers', () => ({
  JsonRpcProvider: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(10000000000000000000n) // 10 ETH
  })),
  Contract: jest.fn().mockImplementation(() => ({
    balanceOf: jest.fn().mockResolvedValue(1000000000000000000000n), // 1000 tokens
    decimals: jest.fn().mockResolvedValue(18),
    name: jest.fn().mockResolvedValue('Test Token'),
    symbol: jest.fn().mockResolvedValue('TEST'),
    slot0: jest.fn().mockResolvedValue({
      sqrtPriceX96: 1500000000000000000000000n,
      tick: 100
    }),
    token0: jest.fn().mockResolvedValue('0x4bF66A12B801dAD73B3B4Ff026623eD7B4969489'),
    token1: jest.fn().mockResolvedValue('0x4200000000000000000000000000000000000006'),
    fee: jest.fn().mockResolvedValue(3000)
  })),
  Wallet: jest.fn().mockImplementation(() => ({
    address: '0xTestAddress'
  })),
  parseEther: jest.fn().mockImplementation((value) => BigInt(value) * 10n ** 18n),
  parseUnits: jest.fn().mockImplementation((value, decimals) => BigInt(value) * 10n ** BigInt(decimals)),
  formatEther: jest.fn().mockImplementation((value) => String(Number(value) / 1e18)),
  formatUnits: jest.fn().mockImplementation((value, decimals) => String(Number(value) / 10 ** decimals)),
  solidityPacked: jest.fn()
}));

// Mock do axios
jest.mock('axios');

describe('TradingBot', () => {
  let tradingBot;

  beforeEach(() => {
    tradingBot = new TradingBot();
    // Espiar os métodos de EventEmitter
    jest.spyOn(EventEmitter.prototype, 'emit');
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (tradingBot.isRunning) {
      tradingBot.stop();
    }
  });

  it('should initialize with default values', () => {
    expect(tradingBot.isRunning).toBe(false);
    expect(tradingBot.config).toHaveProperty('strategy', 'buyDip');
    expect(tradingBot.config).toHaveProperty('investmentAmount', 0.1);
    expect(tradingBot.priceData).toHaveProperty('current', 0);
    expect(tradingBot.tradingState).toHaveProperty('lastTradeTimestamp', 0);
  });

  it('should start and stop the bot', async () => {
    // Mock para não iniciar o monitoramento real
    tradingBot.startPriceMonitoring = jest.fn();
    tradingBot.initializeBlockchainConnection = jest.fn().mockResolvedValue();
    
    await tradingBot.start();
    expect(tradingBot.isRunning).toBe(true);
    expect(EventEmitter.prototype.emit).toHaveBeenCalledWith('botStarted', expect.any(Object));
    
    tradingBot.stop();
    expect(tradingBot.isRunning).toBe(false);
    expect(EventEmitter.prototype.emit).toHaveBeenCalledWith('botStopped', expect.any(Object));
  });

  it('should update configuration', () => {
    const newConfig = {
      strategy: 'dca',
      investmentAmount: 0.2
    };
    
    tradingBot.updateConfig(newConfig);
    expect(tradingBot.config.strategy).toBe('dca');
    expect(tradingBot.config.investmentAmount).toBe(0.2);
    expect(EventEmitter.prototype.emit).toHaveBeenCalledWith('configUpdated', expect.any(Object));
  });

  it('should execute mock buy orders in test mode', async () => {
    tradingBot.priceData.current = 0.001;
    const result = await tradingBot.executeBuyOrder(0.1);
    
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('txHash');
    expect(result).toHaveProperty('tokenAmount');
    expect(result).toHaveProperty('ethAmount', 0.1);
    expect(EventEmitter.prototype.emit).toHaveBeenCalledWith('transaction', expect.any(Object));
  });

  it('should execute mock sell orders in test mode', async () => {
    tradingBot.priceData.current = 0.001;
    const result = await tradingBot.executeSellOrder(100);
    
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('txHash');
    expect(result).toHaveProperty('tokenAmount', 100);
    expect(result).toHaveProperty('ethAmount');
    expect(EventEmitter.prototype.emit).toHaveBeenCalledWith('transaction', expect.any(Object));
  });

  it('should return bot status', () => {
    const status = tradingBot.getStatus();
    
    expect(status).toHaveProperty('isRunning');
    expect(status).toHaveProperty('config');
    expect(status).toHaveProperty('priceData');
    expect(status).toHaveProperty('tradingState');
    expect(status).toHaveProperty('lastUpdate');
  });
});
