import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: String,
  description: String,
  itinerary: String,
  meetingPoints: [String],
  coverPicture: String,
  startTime: Date,
  endTime: Date,
  price: { adult: Number, child: Number },
  difficultyLevel: { type: String, enum: ['easy', 'moderate', 'hard'] },
  includes: [String],
  excludes: [String],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  destination: { type: String, required: true },
  status: { type: String, enum: ["Available", "Sold Out"], default: "Available" },
});

export default mongoose.model('Trip', tripSchema);
