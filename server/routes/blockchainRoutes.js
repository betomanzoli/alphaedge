
const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

// Blockchain data routes
router.get('/balance', blockchainController.getBalance);
router.get('/price', blockchainController.getTokenPrice);
router.get('/liquidity', blockchainController.getLiquidityInfo);

module.exports = router;
