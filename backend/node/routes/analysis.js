const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require('../middleware/auth');

// Analyze code (protected)
router.post('/', authMiddleware, analysisController.validateAnalysis, analysisController.analyzeCode);

module.exports = router;
