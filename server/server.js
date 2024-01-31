const express = require('express');
const fetch = require('node-fetch');
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
