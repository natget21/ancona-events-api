import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
  type: { type: String, enum: ['bus', 'shuttle', 'ship', 'car', 'other'], required: true },
  route: String,
  timetable: [String],
  price: Number,
  capacity: Number,
  status: { type: String, enum: ["active", "inactive", "maintenance", "out of service"], default: "active" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

export default mongoose.model('Transportation', transportationSchema);
