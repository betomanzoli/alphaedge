
const { describe, it, beforeEach, afterEach, expect, jest } = require('@jest/globals');
const { getBalance, getTokenPrice, getLiquidityInfo } = require('../controllers/blockchainController');

// Mock do ethers
jest.mock('ethers', () => ({
  JsonRpcProvider: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(1000000000000000000n) // 1 ETH
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
  formatEther: jest.fn().mockImplementation((value) => String(Number(value) / 1e18)),
  formatUnits: jest.fn().mockImplementation((value, decimals) => String(Number(value) / 10 ** decimals))
}));

// Mock do axios
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      '0x4bf66a12b801dad73b3b4ff026623ed7b4969489': {
        eth: 0.00022
      }
    }
  })
}));

describe('Blockchain Controller', () => {
  let req, res;
  
  beforeEach(() => {
    // Mock de requisição e resposta
    req = {
      query: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('getBalance', () => {
    it('should return balance when address is provided', async () => {
      req.query.address = '0xTestAddress';
      await getBalance(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        balances: expect.objectContaining({
          eth: expect.any(String),
          token: expect.objectContaining({
            name: expect.any(String),
            symbol: expect.any(String),
            balance: expect.any(String)
          })
        })
      }));
    });
    
    it('should return 400 when address is not provided', async () => {
      await getBalance(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false,
        message: expect.any(String)
      }));
    });
  });
  
  describe('getTokenPrice', () => {
    it('should return token price information', async () => {
      await getTokenPrice(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        token: expect.any(String),
        currentPrice: expect.any(Number),
        historicalPrices: expect.any(Array),
        priceChange: expect.objectContaining({
          '1h': expect.any(Number),
          '24h': expect.any(Number),
          '7d': expect.any(Number)
        })
      }));
    });
  });
  
  describe('getLiquidityInfo', () => {
    it('should return liquidity information', async () => {
      await getLiquidityInfo(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        token: expect.any(String),
        liquidityPool: expect.any(String),
        tvl: expect.any(Number),
        volume24h: expect.any(Number),
        feeTier: expect.any(Number)
      }));
    });
  });
});
