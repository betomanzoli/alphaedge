
const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// Bot control routes
router.post('/start', botController.startBot);
router.post('/stop', botController.stopBot);
router.get('/status', botController.getBotStatus);

// Bot configuration routes
router.get('/config', botController.getConfig);
router.post('/config', botController.updateConfig);

// Strategy routes
router.get('/strategies', botController.getStrategies);
router.post('/strategies', botController.setStrategy);

module.exports = router;
