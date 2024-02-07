const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

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

const inventoryRoutes = require('./routes/InventoryRoutes');
const statTrackRoutes = require('./routes/StatTrackRoutes');

app.use('/inventory', inventoryRoutes);
app.use('/stattrack', statTrackRoutes);

// Proxy endpoint
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
