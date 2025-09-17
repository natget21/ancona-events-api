import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: String,
  country: String,
  capacity: Number,
  description: String,
  coverPicture: String,
  contactNumber: String,
  contactEmail: String,
  openingHours: {
    type: Object,
    default: {}
  },
  geo: {
    lat: Number,
    lng: Number
  },
  type: { type: String, enum: ['conference', 'bar', 'restaurant', 'hotel', 'cruise-ship', 'other'] }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Venue', venueSchema);
