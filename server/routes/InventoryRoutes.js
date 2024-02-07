const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const InventoryPrice = require('../models/InventoryPrice');

router.post('/add', async (req, res) => {
    const { steamId, inventoryValue, profileURL } = req.body;
    try {
        const newInventoryPrice = new InventoryPrice({
            steamId,
            inventoryValue,
            profileURL
        });
        await newInventoryPrice.save();
        res.status(201).json(newInventoryPrice);
    } catch (error) {
        console.error('Error saving inventory data:', error);
        res.status(500).send('Error saving inventory data');
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const inventoryPrices = await InventoryPrice.aggregate([
            {
                $sort: { date: -1 } // First, sort all documents by date in descending order
            },
            {
                $group: {
                    _id: "$steamId", // Group by steamId
                    inventoryValue: { $first: "$inventoryValue" }, // Take the first inventoryValue in the sorted list for each group
                    profileURL: { $first: "$profileURL" }, // Same for profileURL
                    date: { $first: "$date" } // And date, ensuring we get the most recent document for each steamId
                }
            },
            {
                $sort: { inventoryValue: -1 } // Optionally, sort the groups by inventoryValue to get the "top" inventories
            },
            {
                $limit: 10 // Limit the result to the top 10
            }
        ]);

        // Optionally, transform the result to match your desired output format
        const transformedResult = inventoryPrices.map(item => ({
            steamId: item._id, // Transform _id back to steamId
            ...item // Spread the other properties
        }));

        res.json(transformedResult);
    } catch (error) {
        console.error('Error fetching inventory leaderboard:', error);
        res.status(500).send('Error fetching inventory leaderboard');
    }
});

router.get('/', async (req, res) => {
    const { steamId } = req.query;
    const apiKey = process.env.STEAM_API_KEY;

    try {
        const apiUrl = `https://www.steamwebapi.com/steam/api/inventory?key=${apiKey}&steam_id=${steamId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching Steam API:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;