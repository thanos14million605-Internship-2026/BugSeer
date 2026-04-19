const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middleware/auth');

// Get user's analysis history (protected)
router.get('/', authMiddleware, historyController.getHistory);

// Get specific history entry (protected)
router.get('/:id', authMiddleware, historyController.getHistoryById);

// Delete history entry (protected)
router.delete('/:id', authMiddleware, historyController.deleteHistory);

module.exports = router;
