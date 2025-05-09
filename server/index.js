
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

// Import routes
const botRoutes = require('./routes/botRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const blockchainRoutes = require('./routes/blockchainRoutes');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/bot', botRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/blockchain', blockchainRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'AlphaEdge Trading Bot API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize trading bot
const TradingBot = require('./bot/TradingBot');
const bot = new TradingBot();

// WebSocket for real-time data (optional for now)
const setupWebSocket = require('./websocket/server');
setupWebSocket(bot);
