const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const GOOGLE_API_KEY="AIzaSyCKYao8hFOqhFVKaEopdssvljsgaMlBAl4";
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
// Routes
app.get('/api/places', async (req, res) => {
    const { latitude, longitude, type } = req.query;

    if (!latitude || !longitude || !type) {
        return res.status(400).json({ message: 'Latitude, Longitude, and Type are required!' });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(url);
        const places = response.data.results.map((place) => ({
            name: place.name,
            address: place.vicinity,
            icon: place.icon,
        }));
        res.status(200).json(places);
    } catch (error) {
        console.error('Error fetching places:', error.message);
        res.status(500).json({ message: 'Failed to fetch places from Google Maps API.' });
    }
});

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
