import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
  type: { type: String, enum: ['bus', 'shuttle', 'ship', 'car', 'other'], required: true },
  name: { type: String, required: true },
  description: String,
  route: [{street:String,time:String,stop:String,order:Number}],
  timetable: [{order:Number,departureTime:String,arrivalTime:String,duration:String}],
  frequency: String,
  shuttleStartPlace: String,
  shuttleEndPlace: String,
  price: Number,
  availability: Number,
  status: { type: String, enum: ["Active", "Maintenance"], default: "Active" }
});

export default mongoose.model('Transportation', transportationSchema);
