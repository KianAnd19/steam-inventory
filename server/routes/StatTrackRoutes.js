const express = require('express');
const router = express.Router();
const StatTrack = require('../models/StatTrack');

router.post('/add', async (req, res) => {
    const { steamId, itemKills, profileURL, itemId, itemURL } = req.body;
    try {
        const newStatTrack = new StatTrack({
            itemId,
            steamId,
            itemKills,
            profileURL,
            itemURL
        });
        await newStatTrack.save();
        res.status(201).json(newStatTrack);
    } catch (error) {
        console.error('Error saving inventory data:', error);
        res.status(500).send('Error saving inventory data');
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const statTracks = await StatTrack.aggregate([
            {
                $sort: { itemKills: -1 }
            },
            {
                $limit: 10
            }
        ]);
        res.json(statTracks);
    } catch (error) {
        console.error('Error fetching stattrack leaderboard:', error);
        res.status(500).send('Error fetching stattrack leaderboard');
    }
});

module.exports = router;


