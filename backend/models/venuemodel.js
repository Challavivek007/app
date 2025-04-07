const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  place: { type: String, required: true },
  price: { type: Number, required: true }, // pricePerHour
  sqft: { type: Number },
  openingTime: { type: String }, // Can be string like "08:00"
  closingTime: { type: String }, // Can be string like "22:00"
  upiId: { type: String },
  image: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now }
});

venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);
