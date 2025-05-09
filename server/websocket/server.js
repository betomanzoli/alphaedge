
const WebSocket = require('ws');

function setupWebSocket(tradingBot) {
  const wss = new WebSocket.Server({ port: 4001 });
  
  console.log('WebSocket server started on port 4001');

  wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send initial bot status
    ws.send(JSON.stringify({
      type: 'status',
      data: tradingBot.getStatus()
    }));

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

    tradingBot.on('priceUpdate', priceUpdateHandler);
    tradingBot.on('transaction', transactionHandler);
    tradingBot.on('botStarted', statusUpdateHandler);
    tradingBot.on('botStopped', statusUpdateHandler);
    tradingBot.on('configUpdated', statusUpdateHandler);

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
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      console.log('Client disconnected');
      tradingBot.removeListener('priceUpdate', priceUpdateHandler);
      tradingBot.removeListener('transaction', transactionHandler);
      tradingBot.removeListener('botStarted', statusUpdateHandler);
      tradingBot.removeListener('botStopped', statusUpdateHandler);
      tradingBot.removeListener('configUpdated', statusUpdateHandler);
    });
  });

  return wss;
}

module.exports = setupWebSocket;
