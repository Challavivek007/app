const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  place: { type: String, required: true },
  address: { type: String }, // Optional full address
  price: { type: Number, required: true }, 
  sqft: { type: Number },
  openingTime: { type: String }, 
  closingTime: { type: String },
  timing: { type: String }, // Optional display string
  upiId: { type: String },
  image: { type: String, required: true },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  sports: [{ type: String }],
  amenities: [{ type: String }],
  rules: [{ type: String }],
  related: [{ type: String }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now }
});

venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);
