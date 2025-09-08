import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  coverPicture: String,
  images: [String],
  itinerary: [{
    time: String,
    description: { type: String, required: true },
  }],
  meetingPoints: [{
    name: { type: String, required: true },
    address: { type: String, required: true },
    time: String,
  }],
  coverPicture: { type: String },
  date: Date,
  openTime: String,
  closeTime: String,
  duration: Number,
  difficultyLevel: { type: String, enum: ['easy', 'moderate', 'challenging'] },
  priceInfo: {
    adult: { type: Number, required: true },
    child: { type: Number, required: true },
    reductionsNote: {
      type: String,
      default: 'Reductions available for students/seniors/groups'
    }
  },
  includes: [String],
  excludes: [String],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  destination: { type: String, required: true },
  status: { type: String, enum: ["available", "sold out", "cancelled", "planning"], default: "available" },
});

export default mongoose.model('Trip', tripSchema);
