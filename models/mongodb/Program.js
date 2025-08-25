import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startTime: Date,
  endTime: Date,
  speakers: [String]
},{
    timestamps: true,
    versionKey: false
  });

export default mongoose.model('Program', programSchema);
