import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
},{ timestamps: true });

ReportSchema.set('toJSON', {
    versionKey: false
});

export const Report = mongoose.model('Report', ReportSchema);
