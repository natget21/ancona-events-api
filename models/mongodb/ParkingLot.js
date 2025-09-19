import mongoose from 'mongoose';

const ParkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  available: { type: Number, required: true },
  description: { type: String }, 
  payments: [{
    type: String,
    enum: ['cash', 'card', 'app'], 
    required: true
  }],
  rates: [{
    label: { type: String, required: true },
    price: { type: Number, required: true },
  }],
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('ParkingLot', ParkingLotSchema);
