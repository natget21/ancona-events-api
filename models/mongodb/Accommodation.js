import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: String,
  description: String,
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  checkInTime: String,
  checkOutTime: String,
  services: [String],
  capacity: Number,
  coverPicture: String,
  parkingInfo: { 
    available: Boolean, 
    details: String, 
    paymentMethod: [String] 
  },
  reservations: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    roomNumber: String
  }],
  metaData: {
    checkInProcedure: String,
    checkoutProcedure: String,
    regulations: [String],
    contactInfo: [{ phone: String, email: String,label: String }],
    deckMapImages:[{
      title: String,
      description: String,
      image: String
    }]
  },
},{
    timestamps: true,
    versionKey: false
  });

export default mongoose.model('Accommodation', accommodationSchema);
