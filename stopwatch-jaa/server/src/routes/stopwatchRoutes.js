// server/src/routes/stopwatchRoutes.js
const express = require('express');
const router = express.Router();
const stopwatchController = require('../controllers/stopwatchController');

router.post('/start', stopwatchController.startStopwatch);
router.post('/stop', stopwatchController.stopStopwatch);
router.post('/lap', stopwatchController.lapStopwatch);
router.post('/reset', stopwatchController.resetStopwatch);

module.exports = router;
