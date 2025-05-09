
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Transaction routes
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.get('/metrics', transactionController.getMetrics);

module.exports = router;
