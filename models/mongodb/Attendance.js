import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date },
  status: { type: String, enum: ['registered', 'checked-in', 'checked-out','cancelled'], default: 'in' }
},{
    timestamps: true,
    versionKey: false
  });

attendanceSchema.index({ event: 1, venue: 1, program: 1, status: 1 });


attendanceSchema.statics.getCurrentCount = async function (venueId) {
  return this.countDocuments({ venue: venueId, status: 'in' });
};


attendanceSchema.statics.getCrowdLevel = async function (venueId) {
  const Venue = mongoose.model('Venue');
  const venue = await Venue.findById(venueId);
  if (!venue) throw new Error('Venue not found');

  const currentCount = await this.getCurrentCount(venueId);
  const capacity = venue.capacity || 100; 

  const ratio = currentCount / capacity;

  let level = 'green'; // default
  if (ratio >= 0.75) level = 'red';
  else if (ratio >= 0.5) level = 'yellow';

  return { currentCount, capacity, level };
};

export default mongoose.model('Attendance', attendanceSchema);
