import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: String,
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  checkIn: Date,
  checkOut: Date,
  services: [String],
  capacity: Number,
  parkingInfo: { available: Boolean, details: String, paymentMethod: String },
  reservations: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    roomNumber: String
  }],
  metaData: {
    checkInProcedure: String,
    checkoutProcedure: String,
    layoutMap: String,
    regulations: String,
    contactInfo: { phone: String, email: String }
  },
});

export default mongoose.model('Accommodation', accommodationSchema);
