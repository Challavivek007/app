const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const uploadRoute = require('./routes/upload');
const Venue = require("./models/venuemodel");

const User = require("./models/usermoderl");

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://aletisiddhureddy:o2JY0wR6sDBvlsNw@cluster0.wy5pyhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Route
app.use('/api/upload', uploadRoute);

app.post('/api/venues', async (req, res) => {
  try {
    console.log(req.body);
    const venue = new Venue(req.body);  // <-- Corrected
    await venue.save();
    res.status(201).json(venue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/venues', async (req, res) => {
  
  try {
    const venues = await Venue.find();

    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Nearby Venues
app.get('/api/venues/nearby', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: "lat and lng are required" });

  try {
    const venues = await Venue.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 10000,
        },
      },
    });

    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  return res.json("hi");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
