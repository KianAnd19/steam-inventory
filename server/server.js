const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const InventoryPrice = require('./models/InventoryPrice');
const { use } = require('./inventories');
const app = express();
const port = 3000;  // You can choose any available port

require('dotenv').config();
app.use(express.json());

// CORS Middleware (adjust according to your security needs)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error', err));

app.post('/inventory/prices', async (req, res) => {
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

app.get('/inventory/leaderboard', async (req, res) => {
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

  
  

// Proxy endpoint
app.get('/inventory', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
