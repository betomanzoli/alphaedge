
const { describe, it, beforeEach, afterEach, expect, jest } = require('@jest/globals');
const WebSocket = require('ws');
const EventEmitter = require('events');
const setupWebSocket = require('../websocket/server');

// Mock do WebSocket
jest.mock('ws', () => {
  const EventEmitter = require('events');
  
  class MockWebSocket extends EventEmitter {
    constructor() {
      super();
      this.readyState = 1;
      this.send = jest.fn();
    }
    
    static Server = jest.fn().mockImplementation(() => {
      const server = new EventEmitter();
      server.clients = new Set();
      server.broadcast = jest.fn();
      return server;
    });
  }
  
  MockWebSocket.OPEN = 1;
  
  return MockWebSocket;
});

describe('WebSocket Server', () => {
  let mockTradingBot;
  let wss;
  
  beforeEach(() => {
    // Criar um mock do TradingBot
    mockTradingBot = new EventEmitter();
    mockTradingBot.getStatus = jest.fn().mockReturnValue({
      isRunning: false,
      config: { strategy: 'test' }
    });
    mockTradingBot.priceData = {
      history: [{ timestamp: Date.now(), price: 0.001 }]
    };
    mockTradingBot.start = jest.fn();
    mockTradingBot.stop = jest.fn();
    mockTradingBot.updateConfig = jest.fn();
    
    // Inicializar o servidor WebSocket
    wss = setupWebSocket(mockTradingBot);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize the WebSocket server', () => {
    expect(WebSocket.Server).toHaveBeenCalledWith({ port: 4001 });
  });
  
  it('should handle new client connections', () => {
    const mockClient = new WebSocket();
    
    // Simular conexão de cliente
    wss.emit('connection', mockClient);
    
    // Verificar se as mensagens iniciais foram enviadas
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('status'));
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('priceHistory'));
  });
  
  it('should handle client messages', () => {
    const mockClient = new WebSocket();
    wss.emit('connection', mockClient);
    
    // Simular mensagem getStatus
    mockClient.emit('message', JSON.stringify({ type: 'getStatus' }));
    expect(mockTradingBot.getStatus).toHaveBeenCalled();
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('status'));
    
    // Simular mensagem startBot
    mockClient.emit('message', JSON.stringify({ type: 'startBot' }));
    expect(mockTradingBot.start).toHaveBeenCalled();
    
    // Simular mensagem stopBot
    mockClient.emit('message', JSON.stringify({ type: 'stopBot' }));
    expect(mockTradingBot.stop).toHaveBeenCalled();
    
    // Simular mensagem updateConfig
    const newConfig = { strategy: 'newStrategy' };
    mockClient.emit('message', JSON.stringify({ type: 'updateConfig', config: newConfig }));
    expect(mockTradingBot.updateConfig).toHaveBeenCalledWith(newConfig);
  });
  
  it('should broadcast events to all clients', () => {
    // Adicionar um cliente mockado
    const mockClient = new WebSocket();
    wss.clients.add(mockClient);
    
    // Verificar o método broadcast
    wss.broadcast('testEvent', { data: 'test' });
    expect(mockClient.send).toHaveBeenCalledWith(JSON.stringify({ type: 'testEvent', data: { data: 'test' } }));
  });
  
  it('should handle trading bot events', () => {
    const mockClient = new WebSocket();
    wss.emit('connection', mockClient);
    
    // Simular eventos do bot
    mockTradingBot.emit('priceUpdate', { price: 0.001 });
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('priceUpdate'));
    
    mockTradingBot.emit('transaction', { type: 'buy' });
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('transaction'));
    
    mockTradingBot.emit('botStarted', {});
    expect(mockClient.send).toHaveBeenCalledWith(expect.stringContaining('status'));
  });
  
  it('should clean up on client disconnect', () => {
    const mockClient = new WebSocket();
    wss.emit('connection', mockClient);
    
    // Verificar setup inicial
    expect(mockTradingBot.listenerCount('priceUpdate')).toBe(1);
    expect(mockTradingBot.listenerCount('transaction')).toBe(1);
    expect(mockTradingBot.listenerCount('botStarted')).toBe(1);
    expect(mockTradingBot.listenerCount('botStopped')).toBe(1);
    
    // Simular desconexão
    mockClient.emit('close');
    
    // Verificar limpeza de event listeners
    expect(mockTradingBot.listenerCount('priceUpdate')).toBe(0);
    expect(mockTradingBot.listenerCount('transaction')).toBe(0);
    expect(mockTradingBot.listenerCount('botStarted')).toBe(0);
    expect(mockTradingBot.listenerCount('botStopped')).toBe(0);
  });
});
