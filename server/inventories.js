const express = require('express');
const router = express.Router();
const { updateLeaderboard, getLeaderboard } = require('../controllers/leaderboardController');

router.post('/update', updateLeaderboard);
router.get('/', getLeaderboard);

module.exports = router;
