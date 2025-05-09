
const WebSocket = require('ws');

function setupWebSocket(tradingBot) {
  const wss = new WebSocket.Server({ port: 4001 });
  
  console.log('WebSocket server started on port 4001');

  // Track active connections
  const activeConnections = new Set();

  wss.on('connection', (ws) => {
    console.log('Client connected');
    activeConnections.add(ws);
    
    // Send initial bot status
    ws.send(JSON.stringify({
      type: 'status',
      data: tradingBot.getStatus()
    }));

    // Send initial price history
    if (tradingBot.priceData && tradingBot.priceData.history) {
      ws.send(JSON.stringify({
        type: 'priceHistory',
        data: tradingBot.priceData.history
      }));
    }

    // Setup bot event listeners
    const priceUpdateHandler = (data) => {
      ws.send(JSON.stringify({
        type: 'priceUpdate',
        data
      }));
    };
    
    const transactionHandler = (data) => {
      ws.send(JSON.stringify({
        type: 'transaction',
        data
      }));
    };
    
    const statusUpdateHandler = () => {
      ws.send(JSON.stringify({
        type: 'status',
        data: tradingBot.getStatus()
      }));
    };
    
    const errorHandler = (data) => {
      ws.send(JSON.stringify({
        type: 'error',
        data
      }));
    };

    tradingBot.on('priceUpdate', priceUpdateHandler);
    tradingBot.on('transaction', transactionHandler);
    tradingBot.on('botStarted', statusUpdateHandler);
    tradingBot.on('botStopped', statusUpdateHandler);
    tradingBot.on('configUpdated', statusUpdateHandler);
    tradingBot.on('botError', errorHandler);

    // Handle client messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        
        switch (data.type) {
          case 'getStatus':
            ws.send(JSON.stringify({
              type: 'status',
              data: tradingBot.getStatus()
            }));
            break;
          case 'startBot':
            tradingBot.start();
            break;
          case 'stopBot':
            tradingBot.stop();
            break;
          case 'updateConfig':
            if (data.config) {
              tradingBot.updateConfig(data.config);
            }
            break;
          case 'getPriceHistory':
            ws.send(JSON.stringify({
              type: 'priceHistory',
              data: tradingBot.priceData.history
            }));
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          data: { message: error.message }
        }));
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('Client disconnected');
      activeConnections.delete(ws);
      tradingBot.removeListener('priceUpdate', priceUpdateHandler);
      tradingBot.removeListener('transaction', transactionHandler);
      tradingBot.removeListener('botStarted', statusUpdateHandler);
      tradingBot.removeListener('botStopped', statusUpdateHandler);
      tradingBot.removeListener('configUpdated', statusUpdateHandler);
      tradingBot.removeListener('botError', errorHandler);
    });
    
    // Handle connection errors
    ws.on('error', (error) => {
      console.error('WebSocket connection error:', error);
      activeConnections.delete(ws);
    });
  });
  
  // Broadcast to all clients
  function broadcast(type, data) {
    const message = JSON.stringify({ type, data });
    for (const client of activeConnections) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
  
  // Attach the broadcast method to the WebSocket server instance
  wss.broadcast = broadcast;

  return wss;
}

module.exports = setupWebSocket;
