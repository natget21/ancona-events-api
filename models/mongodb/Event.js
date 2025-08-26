import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  coverPicture: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  startDateTime: Date,
  endDateTime: Date,
  maxAttendees: Number,
  program: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  status: { type: String, enum: ["Upcoming", "Planning", "Completed"], default: "Planning" },
  metaData: {
    dressCode: String,
    tags: [String],
  },
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Event', eventSchema);
