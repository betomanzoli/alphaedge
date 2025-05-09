
# AlphaEdge Trading Bot - Backend Server

This is the backend server for the AlphaEdge trading bot, which handles the trading logic, blockchain integration, and API endpoints.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Edit the `.env` file with your configuration values.

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Bot Control
- `POST /api/bot/start` - Start the trading bot
- `POST /api/bot/stop` - Stop the trading bot
- `GET /api/bot/status` - Get current bot status

### Bot Configuration
- `GET /api/bot/config` - Get current bot configuration
- `POST /api/bot/config` - Update bot configuration
- `GET /api/bot/strategies` - Get available strategies
- `POST /api/bot/strategies` - Set active strategy

### Transactions
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/metrics` - Get transaction metrics

### Blockchain
- `GET /api/blockchain/balance` - Get wallet balance
- `GET /api/blockchain/price` - Get token price
- `GET /api/blockchain/liquidity` - Get liquidity information

## WebSocket API

Connect to `ws://localhost:4001` for real-time updates on:
- Price changes
- Transactions
- Bot status

## Security

- In production, always set up proper authentication for API endpoints
- Store private keys securely, never in code
- Use environment variables for sensitive information
