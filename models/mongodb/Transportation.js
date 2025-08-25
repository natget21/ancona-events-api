import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
  type: { type: String, enum: ['bus', 'shuttle', 'ship', 'car', 'other'], required: true },
  route: String,
  timetable: String,
  price: Number,
  availability: Number,
  status: { type: String, enum: ["Active", "Maintenance"], default: "Active" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

export default mongoose.model('Transportation', transportationSchema);
