import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: Date,
  endTime: Date,
  description: String,
  speakers: [{ fullName: String, credential: String }]
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Program', programSchema);
