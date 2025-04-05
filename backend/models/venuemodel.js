const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: String,
  price: { type: Number, required: true },
  image: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  createdAt: { type: Date, default: Date.now }
});


venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);